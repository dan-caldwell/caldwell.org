const Scraper = require('./classes/Scraper');

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

        await Scraper.saveETFHoldingsToS3({
            name: 'spy'
        });

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