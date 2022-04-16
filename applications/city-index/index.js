const axios = require('axios');
const AWS = require('aws-sdk');
const { parse } = require('node-html-parser');
const { DEMOGRAPHICS_DOMAIN, CRIME_DOMAIN } = require('./secrets.json');
const { stateToAbbrev, wikiToScoutNames, wikiToCensusNames } = require('./data-map');
const { stripNewlines, createHeadersFromTableContent } = require('./helpers');
const scrapeData = require('./scrape-data');
const tableContent = require('./table-content');
const chalk = require('ansi-colors');

const s3 = new AWS.S3({
    region: 'us-east-1'
});

const bucket = 'caldwell-apps';

const getWikipediaInfo = async () => {
    // Get the data from the Wikipedia API
    const wikiRes = await axios.get(`https://en.wikipedia.org/w/api.php?action=parse&page=List_of_United_States_cities_by_population&section=1&prop=text&format=json`);
    const {
        data: {
            parse: {
                text: {
                    "*": html
                }
            }
        }
    } = wikiRes;
    const output = {
        headers: createHeadersFromTableContent(tableContent),
        rows: []
    };
    // Filter the rows
    const excludedIndexes = [7, 9, 10];
    const root = parse(html);
    const table = root.querySelector('table.sortable');
    const rows = table.querySelectorAll('tbody tr')
        .map(row => {
            const children = row.childNodes
                .map(child =>
                    stripNewlines(child.innerText)
                        .replace(/&#91;.*?&#93;/g, '') // Replace the brackets
                )
                .filter(child => child)
                .filter((child, index) => !excludedIndexes.includes(index));
            // Move "Population rank" after "City" and "State"
            // First move "City" into place
            [children[0], children[1]] = [children[1], children[0]];
            // Move "State" into place
            [children[1], children[2]] = [children[2], children[1]];
            return children;
        })
        .slice(1);

    for (const [index, row] of rows.entries()) {
        const city = row[0];
        const state = row[1];
        const stateAbbrev = stateToAbbrev[state];
        const cityName = wikiToScoutNames[city] || city;
        const formattedCityName = cityName.toLowerCase().replace(/[ \–]/g, '-').replace(/[\.\']/g, '');
        const formattedCityForDemographics =
            wikiToCensusNames[`${city}_${stateAbbrev.toUpperCase()}`] || (formattedCityName.replace(/-/g, '') + 'city' + state.toLowerCase()).replace(/ /g, '');

        console.log(chalk.blueBright(`[${index + 1}, ${rows.length}] - Getting data for ${city}, ${state}`));

        // Crime data
        row.push(
            ...await scrapeData({
                url: `https://www.${CRIME_DOMAIN}/${stateAbbrev}/${formattedCityName}/crime`,
                contentSelector: 'crime',
                city,
                state
            })
        );

        // Census demographics data
        row.push(
            ...await scrapeData({
                url: `https://www.${DEMOGRAPHICS_DOMAIN}/quickfacts/fact/table/${formattedCityForDemographics}?ajax=true`,
                contentSelector: 'census',
                city,
                state
            })
        );
    }
    output.rows = rows;
    return output;
}


(async () => {
    try {
        const output = await getWikipediaInfo();
        await s3.putObject({
            Bucket: bucket,
            Key: 'city-index/data.json',
            Body: JSON.stringify(output),
            ContentType: 'application/json'
        }).promise();
        console.log(chalk.yellowBright('Saved City Index data to S3'));
    } catch (err) {
        console.error(err);
    }

})();
