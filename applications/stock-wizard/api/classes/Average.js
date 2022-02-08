class Average {

    // Average all values in an array (if the values can be averaged)
    static average = ({ data, median = false }) => {
        const totals = {};
        data.forEach(item => {
            for (const key in item) {
                const cleaned = this.cleanValue({ value: item[key] });
                if (!isNaN(cleaned)) {
                    if (!totals[key]) {
                        totals[key] = [{ weight: Number(item.Weight || 0), value: cleaned }];
                    } else {
                        totals[key].push({ weight: Number(item.Weight || 0), value: cleaned });
                    }
                }
            }
        });

        for (const key in totals) {
            if (median) {
                const median = this.median(totals[key].map(item => item.value));
                totals[key] = this.numberWithCommas(median.toFixed(4));
            } else {
                // Get the weighted average
                const weightedAverage = this.weightedAverage(totals[key]);
                totals[key] = this.numberWithCommas(weightedAverage.toFixed(3));
            }
        }
        return totals;
    }

    // Get the weighted average
    static weightedAverage = (nums) => {
        const [sum, weightSum] = nums.reduce(
            (acc, item) => {
                acc[0] = acc[0] + item.value * item.weight;
                acc[1] = acc[1] + item.weight;
                return acc;
            },
            [0, 0]
        );
        return sum / weightSum;
    };

    static median = (values) => {
        if (values.length === 0) throw Error("No inputs");

        values.sort((a, b) => a - b, 0);

        var half = Math.floor(values.length / 2);

        if (values.length % 2)
            return values[half];

        return (values[half - 1] + values[half]) / 2.0;
    }

    static numberWithCommas = (x) => {
        return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    }

    // Converts a string number into a number
    static cleanValue = ({ value }) => {
        if (!/\d/.test(value)) return "NaN";
        let cleanNum = typeof value === "string" ? value?.replace('%', '').replace('$', '').replace(',', '') : String(value);
        if (!cleanNum) return 0;
        const million = cleanNum.endsWith('M');
        const billion = cleanNum.endsWith('B');
        const trillion = cleanNum.endsWith('T');
        if (million) cleanNum = Number(cleanNum.replace('M', '')) * 1000000;
        if (billion) cleanNum = Number(cleanNum.replace('B', '')) * 1000000000;
        if (trillion) cleanNum = Number(cleanNum.replace('T', '')) * 1000000000000;
        return Number(cleanNum) || 0;
    }

}

module.exports = Average;