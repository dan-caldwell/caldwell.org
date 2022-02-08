const StockAPI = require("./StockAPI");
const DataIO = require("./DataIO");
const Average = require("./Average");

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
        const medians = Average.average({
            data,
            median: true
        });
        const averages = Average.average({
            data,
        });
        await DataIO.putJSONObject({
            data: {
                averages,
                medians,
            },
            name: etfName,
            folder: `etf_averages`
        });
    }

}

module.exports = TickerData;