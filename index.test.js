const {  DatePro } = require("./datePro.js");

const instance1 = new DatePro();


const date2 = '02.12.2010';
const formatDate2 = 'DD.MM.YYYY';
const instance2 = new DatePro(date2, formatDate2);


const date3 = '03-03'
const formatDate3 = 'DD-MM'
const instance3 = new DatePro(date3, formatDate3)

const date4 = "19 dzień, 03 miesiąc, 1992 rok"
const formatDate4 = "DD dzień, MM miesiąc, YYYY rok"
const instance4 = new DatePro(date4, formatDate4);

const instance5 = new DatePro()


test('Is DatePro formating defaults - no date, no inputFormat, no outputFormat', () => {
    expect(
        instance1.format()
    ).toMatch(/(\d){2}(\.)(\d){2}(\.)(\d){4}/)
});

test('Is DatePro formating as expected with: date - 02.12.2010, input - DD.MM.YYYY, output - YY-MM-DD', () => {
    expect(
        instance2.format("YY-MM-DD")
    ).toMatch("10-12-02")
});

test('Is DatePro formating as expected with: date - 03-03, input - DD-MM, output - default', () => {
    expect(
        instance3.format()
    ).toMatch("03.03.2020")
});

test('Is DatePro formating custom date', () => {
    expect(
        instance4.format()
    ).toMatch("19.03.1992")
});