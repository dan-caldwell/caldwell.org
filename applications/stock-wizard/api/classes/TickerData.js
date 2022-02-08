const StockAPI = require("./StockAPI");
const DataIO = require("./DataIO");
const Average = require("./Average");
const DateHelper = require("./DateHelper");

class TickerData {

    /**
     * Save the individual ticker data to S3.
     * Also save the total ticker data for figuring out the averages.
     * 
     * @param {{
     *  holdings: array
     *  etfName: string
     * }} param0 
     * 
     * @returns array
     */
    static async saveIndividualTickerData({
        holdings,
        etfName
    }) {
        const totalData = [];
        for (const [index, holding] of holdings.entries()) {
            const data = await StockAPI.lookupTicker({
                ticker: holding.Ticker
            });
            if (data) {
                totalData.push({
                    ...holding,
                    ...data
                });
                // Save the data
                await DataIO.putJSONObject({
                    data,
                    name: holding.Ticker,
                    folder: `individual_holdings/${etfName}`,
                    extraLogInfo: `${index + 1}/${holdings.length}`
                });
            }
        }
        // Save the complete data array
        await DataIO.putJSONObject({
            data: totalData,
            name: etfName,
            folder: `complete_ticker_data`,
        });
        return totalData;
    }

    /**
     * Save the average values (median and weighted average) for the ETF data
     * 
     * @param {{
     *  data: array
     *  etfName: string
     * }} param0 
     */
    static async saveAverages({
        data,
        etfName
    }) {
        const median = Average.average({
            data,
            median: true
        });
        const average = Average.average({
            data,
        });
        const putData = {
            average,
            median,
            lastUpdated: new Date().toString(),
            date: DateHelper.currentDate(),
        }
        // Save the latest data
        await DataIO.putJSONObject({
            data: putData,
            name: etfName,
            folder: `etf_averages/etfs`
        });
        // Save the data for the day (for historical purposes)
        // Add the random stock pick to the list of past picks
        const pastAveragesRaw = await DataIO.getObject({
            key: 'etf_averages/data/average-history.json',
            fallback: '[]'
        });
        const pastAverages = JSON.parse(pastAveragesRaw.Body.toString());

        const dateAlreadyAdded = pastAverages.find(item => item?.date === pick.date);
        if (!dateAlreadyAdded) {
            pastAverages.push(putData);

            await DataIO.putJSONObject({
                data: pastAverages,
                name: 'average-history',
                folder: 'etf_averages/data'
            });
        }
    }

}

module.exports = TickerData;