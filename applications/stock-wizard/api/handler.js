const DataIO = require('./classes/DataIO');
const DataTransformer = require('./classes/DataTransformer');
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

        // Save the holdings
        await DataIO.putJSONObject({
            data: holdingsObject,
            name,
            folder: `etf_holdings_json`
        });

        // Get a random stock to save for the daily stock pick
        const randomPick = holdingsObject.holdings[Math.floor(Math.random() * holdingsObject.holdings.length)];

        // Get a random number of shares to buy
        const numSharesToBuy = Math.round(Math.random() * (100 - 1) + 1);

        const currentDate = DateHelper.currentDate();

        const randomPickFormatted = {
            name: randomPick.Name,
            ticker: randomPick.Ticker,
            sector: randomPick.Sector,
            sharesToBuy: numSharesToBuy,
            date: currentDate
        }

        // Upload the data to S3
        await DataIO.putJSONObject({
            data: randomPickFormatted,
            name: currentDate,
            folder: 'random_stock_picks/days'
        });

        // Upload to the latest stock pick iteration
        await DataIO.putJSONObject({
            data: randomPickFormatted,
            name: 'latest',
            folder: 'random_stock_picks/data'
        });

        // Add the random stock pick to the list of past picks
        const pastPicks = JSON.parse(await DataIO.getObject({
            key: 'random_stock_picks/data/past_picks.json',
            fallback: '[]'
        }));

        const dateAlreadyAdded = pastPicks.find(item => item?.date === currentDate);
        if (!dateAlreadyAdded) {
            pastPicks.push(randomPickFormatted);

            await DataIO.putJSONObject({
                data: pastPicks,
                name: 'pick-history',
                folder: 'random_stock_picks/data'
            });
        }

        const message = `Successfully created stock list data for ${currentDate}`;

        console.log(message);

        return {
            statusCode: 200,
            message
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