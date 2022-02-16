const axios = require('axios');
const fs = require('fs-extra');
const path = require('path');
const { parse } = require('node-html-parser');

// Get the data from the Wikipedia API
axios.get(`https://en.wikipedia.org/w/api.php?action=parse&page=List_of_United_States_cities_by_population&section=1&prop=text&format=json`)
    .then(res => {
        const {
            data: {
                parse: {
                    text: {
                        "*": html
                    }
                }
            }
        } = res;
        const root = parse(html);
        const table = root.querySelector('table.sortable');
        const headers = table.querySelectorAll('th').map(header => header.innerText.replace('\n', '').replace('&#91;a&#93;', ''));
        const output = {};

        const mdxFilePath = path.join(__dirname, '../../blog/data/city-index.mdx');
        const mdxFile = fs.readFileSync(mdxFilePath, {
            encoding: 'utf-8'
        });
        const splitMdxFile = mdxFile.split('\n');
        const lineToInsertAt = splitMdxFile.findIndex(line => line.includes('<Table>')) + 1;
        splitMdxFile.splice(lineToInsertAt, 0, JSON.stringify(headers, null, 2));

        fs.writeFileSync(path.join(__dirname, './data.json'), JSON.stringify(headers));
        // Write the MDX file
        fs.writeFileSync(mdxFilePath, splitMdxFile.join('\n'));
    })
    .catch(err => console.error(err));