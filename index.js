import { DatePro } from './datePro.js';

const date1 = "09.09"
const formatDate1 = "DD.YY";
const instance1 = new DatePro(date1, formatDate1)


const date2 = '03/23/69'
const formatDate2 = 'MM/DD/YY'
const instance2 = new DatePro(date2, formatDate2)


const date3 = '20-3-33'
const formatDate3 = 'D-M-YYYY'
const instance3 = new DatePro(date3, formatDate3)

const date4 = "15.03.2020"
const instance4 = new DatePro(date4)

const instance5 = new DatePro()

instance1.format("DD.MM.YYYY") // '23.03.2020'
instance2.format() // '23.03.2020'
instance3.format("YYYY-M-D") // '23.03.2020'
instance4.format("MM-YYYY-D") // 
instance5.format("dnia D.M roku pańskiego YYYY") 