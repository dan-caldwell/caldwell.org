const axios = require('axios');
const { parse } = require('node-html-parser');
const AWS = require('aws-sdk');

const s3 = new AWS.S3({
    region: 'us-east-1'
});

const bucket = 'caldwell-apps';

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
            //'Location'
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
                    child.innerText
                        .replace('\n', '')
                        .replace(/&#91;.*?&#93;/g, '') // Replace the brackets
                )
                .filter(child => child)
                .filter((child, index) => !excludedIndexes.includes(index))
        ).slice(1);
    output.rows = rows;
    return output;
}