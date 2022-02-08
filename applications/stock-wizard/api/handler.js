const DataIO = require('./classes/DataIO');
const DataTransformer = require('./classes/DataTransformer');
const Random = require('./classes/Random');
const TickerData = require('./classes/TickerData');
const DateHelper = require('./classes/DateHelper');

const allowedOrigins = [
    'http://localhost:3000',
    'https://caldwell.org',
    'https://www.caldwell.org'
]

module.exports.get_image = async event => {
    const origin = event.headers.origin;

    let headers = {};
    if (allowedOrigins.includes(origin)) {
        headers = {
            'Access-Control-Allow-Origin': origin,
            'Access-Control-Allow-Credentials': true,
        }
    }

    return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
            hello: 'world'
        })
    }
}

module.exports.create_stock_list = async event => {
    try {

        const name = 'spy';

        const excelETFBuffer = await DataIO.saveETFHoldingsToS3({
            name
        });
        const holdingsObject = DataTransformer.convertExceltoObject({
            buffer: excelETFBuffer
        });

        const filteredHoldings = holdingsObject.holdings.filter(item => item.Ticker && item.Ticker !== "CASH_USD");

        // Save the holdings
        await DataIO.putJSONObject({
            data: filteredHoldings,
            name,
            folder: `etf_holdings_json`
        });

        // Get the random stock pick
        const randomPick = Random.getRandomPickFromHoldings({
            holdings: filteredHoldings
        });

        // Save the random stock pick
        await Random.saveRandomPickToS3({
            pick: randomPick
        });

        // Scrape list of holdings and save
        const totalData = await TickerData.saveIndividualTickerData({
            holdings: filteredHoldings,
            etfName: name
        });

        // Save the averages
        await TickerData.saveAverages({
            data: totalData,
            etfName: name
        });

        console.log(`Successfully created stock list data for ${randomPick.date}`);

        return {
            statusCode: 200,
            body: 'Success'
        }

    } catch (err) {
        console.error(err);

        return {
            statusCode: err.status || 400,
            body: JSON.stringify({
                message: err.message || 'Bad Request',
                statusCode: err.status || 400
            })
        }

    }
}