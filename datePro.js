// Stwórz klasę DatePro, która pozwala na łatwą operację na datach w różnych formatach
class DatePro{
    constructor(dateAsString, inputDateFormat='DD.MM.YYYY'){
      this.regexForDateFormat = {
        D: /(?<!D)D(?!D)/,
        DD: /(?<!D)DD(?!D)/,
        M: /(?<!M)M(?!M)/,
        MM: /(?<!M)MM(?!M)/,
        YY: /(?<!Y)YY(?!Y)/,
        YYYY: /(?<!Y)YYYY(?!Y)/
      }
      
      this.regexForDateAsString = {
        D: /(\d{1,2})/,
        DD: /(\d{2})/,
        M: /(\d{1,2})/,
        MM: /(\d{2})/,
        YY: /(\d{2})/,
        YYYY: /(\d{1,5})/
      }

      if (!dateAsString) {
        this.date = new Date();
      } else {
      // Wyciągamy z inputDateFormat formaty których użyto
      const regexInInput = {};

      for (const prop in this.regexForDateFormat) {
        if (inputDateFormat.search(this.regexForDateFormat[prop]) >= 0) {
          regexInInput[prop] = inputDateFormat.search(this.regexForDateFormat[prop])
        }
      }

      // Sortujemy formaty aby ustalić kolejność ich użycia, następnie wrzucamy w dateWithoutOrder liczby z dateAsString według kolejności formatow

      const regexOrder = Object.keys(regexInInput).sort(function(a,b){return regexInInput[a]-regexInInput[b]});
      const dateWithoutOrder = [];

      for (let i = 0; i < regexOrder.length; i++) {
        const arr= dateAsString.match(this.regexForDateAsString[regexOrder[i]]);
        dateWithoutOrder.push(arr[0]);
        dateAsString = dateAsString.replace(this.regexForDateAsString[regexOrder[i]], "")
      }

      // Tworzymy obiekt w którym key to użyty format, a value to odpowiadające liczby z dateAsString

      const validDate = {};

      for (let i = 0; i < regexOrder.length; i++) {
        validDate[regexOrder[i]] = dateWithoutOrder[i]
      }

      //Na podstawie danych z validDate tworzymy nową date za pomocą new Date. Defaultowe wartości dla roku, miesiąca, dnia są pobierane z bieżącej daty. Jako, że new Date nie obsługuje lat poniżej 3 cyfr, trzeba ręcznie je ustawić za pomocą setFullYear()

      const currentDate = new Date();
      this.date = new Date(validDate.YYYY || 20 + validDate.YY ||  currentDate.getFullYear(), validDate.M - 1 || validDate.MM - 1 || currentDate.getMonth(), validDate.D || validDate.DD || currentDate.getDate());

      if (validDate.YYYY) {
        if ( validDate.YYYY.length === 2 || validDate.YYYY.length === 1 ) {
          this.date.setFullYear(validDate.YYYY)
        }
      }
    }
    }

    format(outputStringFormat='DD.MM.YYYY'){
      let d = this.date;
      // Funkcja pomocnicza dodająca 0 dla liczb z jedną cyfrą w formatach wymagających 2 
      function pad(n) {
        return n<10 ? '0'+n : n + '';
      }
      // Pobieramy z wykreowanej daty liczby pod wszystkie formaty
      // Dla formatu YY trzeba wyciąć dwie ostatnie cyfr, chyba że jest to rok z jedną cyfrą, gdyż wtedy jest to niemożliwe
      const dateForOutput = {
        D: d.getDate(),
        DD: pad(d.getDate()),
        M: d.getMonth() + 1,
        MM: pad(d.getMonth() + 1),
        YYYY: d.getFullYear(),
        YY: String(d.getFullYear()).length >= 2 
        ? String(d.getFullYear()).slice(String(d.getFullYear()).length - 2)
        : pad(d.getFullYear())
      }

      //Podkładamy pod formaty z outputStringFormat liczby z dateForOutput

      for (const prop in this.regexForDateFormat) {
        if (outputStringFormat.search(this.regexForDateFormat[prop]) >= 0) {
          outputStringFormat = outputStringFormat.replace(this.regexForDateFormat[prop], dateForOutput[prop])
        }
      }
      console.log(outputStringFormat)
      return outputStringFormat
    }
}
//  export { DatePro }
module.exports = {
    DatePro : DatePro
}