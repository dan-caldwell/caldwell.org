const axios = require('axios');
const decodedURIComponent = `{"ticker":"tsla","path":"/tsla"}`;
const url = `https://www.${process.env.STOCK_DATA_DOMAIN}/market-data/quotes/TSLA?id=${encodeURIComponent(decodedURIComponent)}&type=quotes_chart`;

class StockAPI {

    static async lookupTicker() {
        const res = await axios.get(url, {});
        console.log(res.data.data.quoteData.Financials);
    }

}

StockAPI.lookupTicker();

module.exports = StockAPI;
