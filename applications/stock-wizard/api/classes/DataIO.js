const axios = require('axios');
const AWS = require('aws-sdk');

const s3 = new AWS.S3({
    region: 'us-east-1'
});

const bucket = 'caldwell-apps';

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
            `https://www.${process.env.ETF_HOLDINGS_CSV_DOMAIN}/us/en/intermediary/etfs/library-content/products/fund-data/etfs/us/holdings-daily-us-en-${name.toLowerCase()}.xlsx`,
            {
                responseType: 'arraybuffer'
            }
        );
        
        await s3.putObject({
            Bucket: bucket,
            Key: `stock-wizard/etf_holdings_xls/${name}.xlsx`,
            Body: data
        }).promise();
        console.log(`Saved key: stock-wizard/etf_holdings_xls/${name}.xlsx to bucket: ${bucket}`);

        return data;

    }

    /**
     * Given a Javascript object, save to S3.
     * 
     * @param {{
     *  data: object
     *  name: string
     *  folder: string
     * }} param0 
     */
    static async putJSONObject({
        data,
        name,
        folder,
        extraLogInfo
    }) {
        await s3.putObject({
            Bucket: bucket,
            Key: `stock-wizard/${folder}/${name}.json`,
            Body: JSON.stringify(data),
            ContentType: 'application/json'
        }).promise();
        console.log(`Saved key: stock-wizard/${folder}/${name}.json to bucket: ${bucket}`, extraLogInfo);
    }

    static async getHoldingsObject({
        name
    }) {
        const json = await s3.getObject({
            Bucket: bucket,
            Key: `stock-wizard/etf_holdings_json/${name}.json`
        }).promise();
        return JSON.parse(json);
    }

    /**
     * A wrapper for s3.getObject
     * 
     * @param {{
     *  key: string
     *  fallback: any
     * }} param0 
     * @returns any
     */
    static async getObject({
        key,
        fallback = '[]'
    }) {
        try {
            return await s3.getObject({
                Key: `stock-wizard/${key}`,
                Bucket: bucket
            }).promise();
        } catch (err) {
            return fallback
        }
    }

}

module.exports = DataIO;