const axios = require('axios');

class StockAPI {

    static async lookupTicker({
        ticker
    }) {
        try {
            const unixTime = Math.round((new Date()).getTime() / 1000);
            const formattedTicker = ticker.toUpperCase();
            const res = await axios.get(`https://query2.${process.env.STOCK_DATA_DOMAIN}/ws/fundamentals-timeseries/v1/finance/timeseries/${formattedTicker}?lang=en-US&region=US&symbol=${formattedTicker}&padTimeSeries=true&type=quarterlyMarketCap%2CtrailingMarketCap%2CquarterlyEnterpriseValue%2CtrailingEnterpriseValue%2CquarterlyPeRatio%2CtrailingPeRatio%2CquarterlyForwardPeRatio%2CtrailingForwardPeRatio%2CquarterlyPegRatio%2CtrailingPegRatio%2CquarterlyPsRatio%2CtrailingPsRatio%2CquarterlyPbRatio%2CtrailingPbRatio%2CquarterlyEnterprisesValueRevenueRatio%2CtrailingEnterprisesValueRevenueRatio%2CquarterlyEnterprisesValueEBITDARatio%2CtrailingEnterprisesValueEBITDARatio&merge=false&period1=0&period2=${unixTime}&corsDomain=*`);
            const {
                data: {
                    timeseries: {
                        result
                    }
                }
            } = res;
            return Object.fromEntries(result.map(item => {
                const out = [];
                const types = item.meta.type;
                const keys = Object.keys(item);
                for (const key of keys) {
                    if (!types.includes(key)) {
                        delete item[key];
                    } else if (item[key]) {
                        // Sort by asOfDate
                        item[key].sort((a, b) => {
                            return new Date(b?.asOfDate).getTime() - new Date(a?.asOfDate).getTime()
                        });

                        // Get the values in the as-of date
                        for (const [index, obj] of item[key].entries()) {
                            const keyStart = key.charAt(0).toUpperCase() + key.slice(1);
                            let keyName = keyStart + (obj?.asOfDate ? `_${obj.asOfDate}` : '');
                            if (obj?.periodType === 'TTM' && index === 0) {
                                keyName = keyStart + '_Current';
                            } else if (obj?.periodType === 'TTM') {
                                keyName = `${keyStart}_${index}_TTMAgo`;
                            } else if (obj?.periodType === '3M') {
                                keyName = `${keyStart}_${index + 1}_QuartersAgo`;
                            }
                            out.push([keyName, obj?.reportedValue?.raw]);
                        }
                    } else if (key !== 'error') {
                        console.log(`No value for ${ticker} key ${key}`);
                    }
                }
                return out;
            }).flat());
        } catch (err) {
            console.error(err);
            return null;
        }
    }

}

module.exports = StockAPI;
