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

    /**
     * Get a formatted date for today.
     * 
     * @returns string
     */
    static currentDate() {
        const today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        const yyyy = today.getFullYear();

        return `${yyyy}-${mm}-${dd}`;
    }

}

module.exports = DataTransformer;