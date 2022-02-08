const DataTransformer = require('./DataTransformer');
const DataIO = require('./DataIO');

class Random {
    static getRandomPickFromHoldings({
        holdings
    }) {
        // Get a random stock to save for the daily stock pick
        const randomPick = holdings[Math.floor(Math.random() * holdings.length)];

        // Get a random number of shares to buy
        const numSharesToBuy = Math.round(Math.random() * (100 - 1) + 1);

        const currentDate = DataTransformer.currentDate();

        return {
            name: randomPick.Name,
            ticker: randomPick.Ticker,
            sector: randomPick.Sector,
            sharesToBuy: numSharesToBuy,
            date: currentDate
        }
    }

    static async saveRandomPickToS3({
        pick
    }) {
        // Upload the data to S3
        await DataIO.putJSONObject({
            data: pick,
            name: pick.date,
            folder: 'random_stock_picks/days'
        });

        // Upload to the latest stock pick iteration
        await DataIO.putJSONObject({
            data: pick,
            name: 'latest',
            folder: 'random_stock_picks/data'
        });

        // Add the random stock pick to the list of past picks
        const pastPicks = JSON.parse(await DataIO.getObject({
            key: 'random_stock_picks/data/past_picks.json',
            fallback: '[]'
        }));

        const dateAlreadyAdded = pastPicks.find(item => item?.date === pick.date);
        if (!dateAlreadyAdded) {
            pastPicks.push(pick);

            await DataIO.putJSONObject({
                data: pastPicks,
                name: 'pick-history',
                folder: 'random_stock_picks/data'
            });
        }

        console.log('Saved random stock pick', pick);
    }
}

module.exports = Random;