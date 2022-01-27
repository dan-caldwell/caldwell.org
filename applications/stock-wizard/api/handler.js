const DataIO = require('./classes/DataIO');
const DataTransformer = require('./classes/DataTransformer');

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

        const excelETFBuffer = await DataIO.saveETFHoldingsToS3({
            name: 'spy'
        });
        const holdingsObject = DataTransformer.convertExceltoObject({
            buffer: excelETFBuffer
        });

        console.log({
            holdingsObject
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