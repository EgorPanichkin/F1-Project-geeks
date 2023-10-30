// CONVERTER
// Валюты
// EUR - Евро
// USD - Американский доллар
// GBP - Фунты стерлинга
// KZT - Казахский тенге
// RUB - Российский рубль
// CNY - Китайский Юань
// JPY - Японская Иена

// https://www.cbr-xml-daily.ru/latest.js

let data

const currencyData = async() => {
  try {
    const resp = await fetch('https://www.cbr-xml-daily.ru/latest.js')
    data = await resp.json()
    return data
    // console.log(data);
  } catch (error) {
    console.log(`ERROR: ${error.message}`);
  }
}

currencyData()

const selector1 = document.querySelector('#currency-selector1')
const selector2 = document.querySelector('#currency-selector2')
const inputs = document.querySelectorAll('.currency-input')

let currency1 = selector1.value
let currency2 = selector2.value

selector1.addEventListener('change', () => {
  currency1 = selector1.value
  console.log(currency1, currency2);
})

selector2.addEventListener('change', () => {
  currency2 = selector2.value
  console.log(currency1, currency2);
})

inputs.forEach((input) => {
  input.addEventListener('input', (event) => {
    if (event.target.id === 'currency-input1'){
      inputs[1].value = (convert(event.target.value, currency1, currency2, true)).toFixed(2)
      if (event.target.value === '') {
        inputs[1].value = ''
      }
    } else if (event.target.id === 'currency-input2') {
      inputs[0].value = (convert(event.target.value, currency1, currency2, false)).toFixed(2)
      if (event.target.value === '') {
        inputs[0].value = ''
      }
    }
  })
})

function convert(value, currency1, currency2, isTrue){
  if ((currency2 === 'RUB' && currency1 !== 'RUB' && !isTrue)) {
    return value * data.rates[currency1]
  } else if ((currency1 === 'RUB' && currency2 !== 'RUB' && isTrue)){
    return value * data.rates[currency2]
  } else if ((currency2 === 'RUB' && currency1 !== 'RUB' && isTrue)){
    return value / data.rates[currency1]
  } else if ((currency1 === 'RUB' && currency2 !== 'RUB' && !isTrue)){
    return value / data.rates[currency2]
  } else if (currency2 === 'RUB' && currency1 === 'RUB') {
    return Number(value)
  } else if (isTrue) {
    return value / (data.rates[currency1] / data.rates[currency2])
  } else if (!isTrue){
    return value * (data.rates[currency1] / data.rates[currency2])
  }
}



// Debounce
function debounce(callee, timeoutMs) {
  return function perform(...args) {
    let previousCall = this.lastCall
    this.lastCall = Date.now()
    if (previousCall && this.lastCall - previousCall <= timeoutMs) {
      clearTimeout(this.lastCallTimer)
    }
    this.lastCallTimer = setTimeout(() => callee(...args), timeoutMs)
  }
}