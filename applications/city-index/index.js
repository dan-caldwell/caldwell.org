const axios = require('axios');
const { parse } = require('node-html-parser');
const AWS = require('aws-sdk');
const { DEMOGRAPHICS_DOMAIN, CRIME_DOMAIN } = require('./secrets.json');
const { stateToAbbrev, wikiToScoutNames, wikiToCensusNames, censusFactIds } = require('./data-map');
const { stripNewlines, getValueByCensusId } = require('./helpers');
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
        headers: [
            'Population rank',
            'City',
            'State',
            '2020 census',
            '2010 census',
            'Change',
            '2020 land area (mi)',
            //'2020 land area (km)', 
            '2020 population density (mi)',
            //'2020 population density (km)', 
            //'Location',
            'Violent crime (per 1000)',
            'Property crime (per 1000)',
            'US city crime percentile',
            'Per capita income',
            'Median rent',
            `Bachelor's degree holders`
        ],
        rows: []
    };
    // Filter the rows
    const excludedIndexes = [7, 9, 10];
    const root = parse(html);
    const table = root.querySelector('table.sortable');
    const rows = table.querySelectorAll('tbody tr')
        .map(row =>
            row.childNodes
                .map(child =>
                    stripNewlines(child.innerText)
                        .replace(/&#91;.*?&#93;/g, '') // Replace the brackets
                )
                .filter(child => child)
                .filter((child, index) => !excludedIndexes.includes(index))
        ).slice(1);

    for (const [index, row] of rows.entries()) {
        const city = row[1];
        const state = row[2];
        const stateAbbrev = stateToAbbrev[state];
        const cityName = wikiToScoutNames[city] || city;
        const formattedCityName = cityName.toLowerCase().replace(/[ \–]/g, '-').replace(/[\.\']/g, '');
        const formattedCityForDemographics = 
            wikiToCensusNames[`${city}_${stateAbbrev.toUpperCase()}`] || (formattedCityName.replace(/-/g, '') + 'city' + state.toLowerCase()).replace(/ /g, '');
        console.log(`[${index + 1}, ${rows.length}] - Getting data for ${city}, ${state}`);

        // Crime data
        try {
            const res = await axios.get(
                `https://www.${CRIME_DOMAIN}/${stateAbbrev}/${formattedCityName}/crime`
            );
            const crimeRoot = parse(res.data);
            const violentCrimeRate = stripNewlines(crimeRoot.querySelector('.crime-data-container table tr:nth-child(2) td:nth-child(2)')?.innerText) || 'N/A';
            const propertyCrimeRate = stripNewlines(crimeRoot.querySelector('.crime-data-container table tr:nth-child(2) td:nth-child(3)')?.innerText) || 'N/A';
            const crimeIndex = stripNewlines(crimeRoot.querySelector('.crime-data-container .score')?.innerText) || 'N/A';
            // Add the crime data to the row
            row.push(violentCrimeRate, propertyCrimeRate, crimeIndex);
        } catch (err) {
            console.error(err);
            row.push('N/A', 'N/A', 'N/A');
            console.error(chalk.redBright(`Could not get crime info for ${city}, ${state}`));
        }

        // Demographics data
        try {
            const res = await axios.get(
                `https://www.${DEMOGRAPHICS_DOMAIN}/quickfacts/fact/table/${formattedCityForDemographics}?ajax=true`
            );
            const demographicsRoot = parse(res.data);
            const perCapitaIncome = getValueByCensusId(demographicsRoot, censusFactIds.per_capita_income);
            const medianRent = getValueByCensusId(demographicsRoot, censusFactIds.median_rent);
            const percentWithBachelors = getValueByCensusId(demographicsRoot, censusFactIds.percent_with_bachelors);
            row.push(perCapitaIncome, medianRent, percentWithBachelors);
        } catch (err) {
            console.error(chalk.redBright(`Could not get demographics info for ${city}, ${state}`));
            row.push('N/A', 'N/A', 'N/A');
        }
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
    } catch (err) {
        console.error(err);
    }

})();
