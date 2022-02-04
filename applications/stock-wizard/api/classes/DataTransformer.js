const excelToJson = require('convert-excel-to-json');

class DataTransformer {

    static convertExceltoObject({
        buffer,
    }) {
        return excelToJson({
            source: buffer,
            header: {
                rows: 5
            },
            columnToKey: {
                A: 'Name',
                B: 'Ticker',
                C: 'ID',
                D: 'SEDOL',
                E: 'Weight',
                F: 'Sector',
                G: 'Shares Held'
            }
        });
    }

}

module.exports = DataTransformer;