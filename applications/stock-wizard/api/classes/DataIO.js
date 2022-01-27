const axios = require('axios');
const AWS = require('aws-sdk');

const s3 = new AWS.S3({
    region: 'us-east-1'
});

// Handles S3 fetching, scraping, and saving of data
class DataIO {

    /**
     * Gets ETF holdings from SSGA and saves to S3
     * 
     * @param {{
     *  name: string
     * }} param0 
     * @returns buffer
     */
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

        return data;

    }

}

module.exports = DataIO;