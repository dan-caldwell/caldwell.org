const axios = require('axios');
const chalk = require('ansi-colors');
const { parse } = require('node-html-parser');
const tableContent = require('./table-content');
const { getDataFromTableContent } = require('./helpers');

// Scrapes the data from a source and adds the values to the row
module.exports = async ({
    url,
    contentSelector,
    city,
    state
}) => {
    const output = [];
    try {
        const res = await axios.get(url);
        const crimeRoot = parse(res.data);
        // Add the crime data to the output
        output.push(...getDataFromTableContent(crimeRoot, tableContent[contentSelector]));
        console.log(chalk.greenBright(`Successfully got ${contentSelector} info for ${city}, ${state}`));
    } catch (err) {
        console.error(err);
        output.push(...new Array(tableContent[contentSelector].length).fill('N/A'));
        console.error(chalk.redBright(`Could not get ${contentSelector} info for ${city}, ${state}`));
    }
    return output;
}