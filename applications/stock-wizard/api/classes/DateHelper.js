class DateHelper {
    /**
     * Get a formatted date for today.
     * 
     * @returns string
     */
    static currentDate() {
        const today = new Date();
        return this.formatDateToString(today);
    }

    static formatDateToString(date) {
        const dd = String(date.getDate()).padStart(2, '0');
        const mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
        const yyyy = date.getFullYear();

        return `${yyyy}-${mm}-${dd}`;
    }

    static randomDate(from, to) {
        const fromTime = new Date(from).getTime();
        const toTime = new Date(to).getTime();
        const date = new Date(fromTime + Math.random() * (toTime - fromTime));
        return this.formatDateToString(date);
    }

    static addYearsToDateString(dateString, numYears) {
        const split = dateString.split('-');
        split[0] = Number(split[0]) + numYears;
        return split.join('-');
    }
}

module.exports = DateHelper;