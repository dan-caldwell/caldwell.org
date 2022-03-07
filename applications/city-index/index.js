const axios = require('axios');
const { parse } = require('node-html-parser');
const AWS = require('aws-sdk');
const { stateToAbbrev, wikiToScoutNames } = require('./data-map');
const { stripNewlines } = require('./helpers');

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
            '2020 rank',
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
            'US city crime percentile'
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

        try {
            console.log(`[${index + 1}, ${rows.length}] - Getting crime data for ${city}, ${state}`);
            const cityName = wikiToScoutNames[city] || city;
            const formattedCityName = cityName.toLowerCase().replace(/[ \–]/g, '-').replace(/[\.\']/g, '');
            const res = await axios.get(
                `https://www.neighborhoodscout.com/${stateAbbrev}/${formattedCityName}/crime`
            );
            const crimeRoot = parse(res.data);
            const violentCrimeRate = stripNewlines(crimeRoot.querySelector('.crime-data-container table tr:nth-child(2) td:nth-child(2)').innerText);
            const propertyCrimeRate = stripNewlines(crimeRoot.querySelector('.crime-data-container table tr:nth-child(2) td:nth-child(3)').innerText);
            const crimeIndex = stripNewlines(crimeRoot.querySelector('.crime-data-container .score').innerText);
            // Add the crime data to the row
            row.push(violentCrimeRate, propertyCrimeRate, crimeIndex);
        } catch (err) {
            console.error(err);
            row.push('N/A', 'N/A', 'N/A');
            console.error('Could not get crime info for', city, ',', state);
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
