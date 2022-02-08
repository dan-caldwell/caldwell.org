const axios = require('axios');
require('dotenv').config();
const baseURL = `https://www.${process.env.STOCK_DATA_DOMAIN}/market-data`;

class StockAPI {

    static async lookupTicker({
        ticker
    }) {
        try {
            const formattedTicker = ticker.toLowerCase();
            const decodedURIComponent = `{"ticker":"${formattedTicker}","path":"/${formattedTicker}"}`;
            const res = await axios.get(`${baseURL}/quotes/${formattedTicker.toUpperCase()}?id=${encodeURIComponent(decodedURIComponent)}&type=quotes_chart`, {});
            return res.data.data.quoteData.Financials;
        } catch (err) {
            console.error(err);
            return null;
        }

    }

}

module.exports = StockAPI;
