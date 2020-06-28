class DatePro{
    constructor(dateAsString, inputDateFormat='DD.MM.YYYY'){
        if (typeof dateAsString !== 'string' && typeof dateAsString !== "undefined") {
            throw 'DateAsString has to be string, if it is not inputed, then it will be current date'
        }
        if (!dateAsString) {
            this.date = new Date();
        } else {
            if (dateAsString.length !== inputDateFormat.length) {
                throw 'dateAsString has to have the same lenght as inputDateFormat'
            }
            if (inputDateFormat.search("DD") >=0) {
                this.day = dateAsString.substr(inputDateFormat.search("DD"), 2);
            }
            if (inputDateFormat.search("MM") >=0) {
                this.month = dateAsString.substr(inputDateFormat.search("MM"), 2);
            }
            if (inputDateFormat.search("YYYY") >=0) {
                this.year = dateAsString.substr(inputDateFormat.search("YYYY"), 4);
            }
            if (inputDateFormat.search(/(?<!Y)YY(?!Y)/) >=0) {
                this.year = 20 + dateAsString.substr(inputDateFormat.search(/(?<!Y)YY(?!Y)/), 2);
            }
            const currentDate = new Date();
            this.date = new Date(this.year || currentDate.getFullYear(), this.month -1 || currentDate.getMonth(), this.day || currentDate.getDate());
        }
    }

    format(outputStringFormat='DD.MM.YYYY'){
        function pad(n) {
            return n<10 ? '0'+n : n + '';
        }
        const day = pad(this.date.getDate());
        const month = pad(this.date.getMonth() + 1);
        let year = this.date.getFullYear() + "";
        if (year.length === 1) {
            year = "000" + year
        }
        if (year.length === 2) {
            year = "00" + year
        }
        if (year.length === 3) {
            year = "0" + year
        }
        const arrayOutPutStringFormat = [...outputStringFormat];

        if (outputStringFormat.indexOf("DD") >= 0) {
            arrayOutPutStringFormat.splice(outputStringFormat.indexOf("DD"), 2, day[0], day[1]);
        }
        if (outputStringFormat.indexOf("MM") >= 0) {
            arrayOutPutStringFormat.splice(outputStringFormat.indexOf("MM"), 2, month[0], month[1]);
        }
        if (outputStringFormat.search(/(?<!Y)YY(?!Y)/) >= 0) {
            arrayOutPutStringFormat.splice(outputStringFormat.search("YY"), 2, year[2], year[3]);
        }
        if (outputStringFormat.indexOf("YYYY") >= 0) {
            arrayOutPutStringFormat.splice(outputStringFormat.indexOf("YYYY"), 4, year[0], year[1], year[2], year[3]);
        }

        const result = arrayOutPutStringFormat.join("");
        if (result === outputStringFormat) {
            throw "outputStringFormat must be a string, where days are DD, month is MM, and year is YYYY or YY"
        }
        return result
    }
}

module.exports = {
    DatePro : DatePro
}