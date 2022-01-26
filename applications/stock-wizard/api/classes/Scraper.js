const axios = require('axios');
const AWS = require('aws-sdk');

const s3 = new AWS.S3({
    region: 'us-east-1'
});

class Scraper {

    // Gets ETF holdings from SSGA and saves to S3
    static async saveETFHoldingsToS3({
        name
    }) {

        if (!name || typeof name !== 'string') throw {
            status: 400,
            message: 'No ETF name supplied'
        }

        const { data } = await axios.get(
            `https://www.ssga.com/us/en/intermediary/etfs/library-content/products/fund-data/etfs/us/holdings-daily-us-en-${name.toLowerCase()}.xlsx`,
            {
                responseType: 'arraybuffer'
            }
        );
        
        await s3.putObject({
            Bucket: 'stock-wizard',
            Key: `raw_etf_holdings/${name}.xlsx`,
            Body: data
        }).promise();
        console.log(`Saved key: raw_etf_holdings/${name}.xlsx to bucket: stock-wizard`);

    }

}

module.exports = Scraper;