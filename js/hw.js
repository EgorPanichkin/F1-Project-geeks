const car = document.querySelector('.child_block')
let xPosition = 400
let yPosition = 142
let path = 0
let turn = 0
let angel = 0

function moveRight() {
  path++
  xPosition ++
  car.style.left = xPosition + 'px'
}
function moveLeft() {
  path++
  xPosition --
  car.style.left = xPosition + 'px'
}
function moveDown() {
  path++
  yPosition ++
  car.style.top = yPosition + 'px'
}
function moveUp() {
  path++
  yPosition --
  car.style.top = yPosition + 'px'
}


function rotate(radius) {
  path++
  xPosition = (xPosition + Math.cos(turn) * radius)
  yPosition = (yPosition + Math.sin(turn) * radius)
  turn += 0.005
  car.style.left = xPosition + 'px'
  car.style.top = yPosition + 'px'
  angel += 0.3
  car.style.rotate = angel + 'deg'
}

setInterval(() => {
  if (path < 425) {
    moveRight()
  } else if (path >= 425 && path < 1030){ // 605px
    rotate(1.15)
  } else if (path >= 1030 && path < 1594){ // 564px
    moveLeft()
  } else if (path >= 1594 && path < 2192){
    rotate(1.15)
  } else if (path >= 2192 && path < 2390){
    moveRight()
  } else {
    xPosition = 400
    yPosition = 142
    path = 0
    turn = 0
    angel = 0
  }
}, 4);

// STOPWATCH
const startBtn = document.querySelector('#start')
const stopBtn = document.querySelector('#stop')
const resetBtn = document.querySelector('#reset')

const timerSec = document.querySelector('#sec')
const timerMS = document.querySelector('#msec')

let msec = 0
let sec = 0

function startEvent() {
  startBtn.removeEventListener('click', startEvent)
  timerMS.innerText = msec
  timerSec.innerText = sec
  return interval = setInterval(() => {
    msec++
    if (msec < 10) {
      timerMS.innerText ='0' + msec
    } else {
      timerMS.innerText = msec
    }
    if (msec === 99) {
      msec = 0
      sec ++
    }
    
    timerSec.innerText = sec
  }, 10)
}

startBtn.addEventListener('click', startEvent)


stopBtn.addEventListener('click', () => {
  startBtn.addEventListener('click', startEvent)
  clearInterval(interval)
})

resetBtn.addEventListener('click', () => {
  clearInterval(interval)
  msec = 0
  sec = 0
  timerMS.innerText ='0' + msec
  timerSec.innerText ='0' + sec
  startBtn.addEventListener('click', startEvent)
  lights.forEach((light) => {
    light.style.opacity = 0
  })
  stopTimers()
})

// LIGHTS

const startRaceBtn = document.querySelector('#race')
const lights = document.querySelectorAll('.light')
const redOne = document.querySelector('#red-1')
const redTwo = document.querySelector('#red-2')
const green = document.querySelector('#green')
const yellow = document.querySelector('#yellow')
let timer
let start = false
let timer1
let timer2
let timer3
let timer4

startRaceBtn.addEventListener('click', () => {
  if (startRaceBtn.innerText === 'START') {
    startRaceBtn.innerText = 'RACE!'
    yellow.style.opacity = 0
    randomTime()
    console.log(timer);
    lightStart()
  } else {
    startRaceBtn.innerText = 'START'
    if (!start) {
      lights.forEach((light) => {
        light.style.opacity = 0
      })
      yellow.style.opacity = 1
      stopTimers()
    }
    clearInterval(interval)
    start = false
  }
})


function lightStart() {
  timer1 = setTimeout(() => {
    redOne.style.opacity = 1;
    timer2 = setTimeout(() => {
      redTwo.style.opacity = 1;
      timer3 = setTimeout(() => {
        green.style.opacity = 1;
        timer4 = setTimeout(() => {
          lights.forEach((light) => {
            light.style.opacity = 0;
          });
          startEvent();
          start = true;
        }, timer);
      }, 1500);
    }, 1500);
  }, 1000);
}

function stopTimers() {
  clearTimeout(timer1);
  clearTimeout(timer2);
  clearTimeout(timer3);
  clearTimeout(timer4);
}

function randomTime() {
  return timer = Math.floor(Math.random() * (2501 - 1000) + 1000);
}

// WEATHER
// fetch URL `${BASE_URL}?q=${searchingCity}&appid=${API_KEY}`
// icon URL `https://openweathermap.org/img/wn/${iconName}@2x.png`

const cityInput = document.querySelector('.city-input')
const city = document.querySelector('#city')
const temp = document.querySelector('#temp')
const icon = document.querySelector('#weather-img')

let searchingCity
let iconName

const API_KEY = 'e417df62e04d3b1b111abeab19cea714'
const BASE_URL = 'http://api.openweathermap.org/data/2.5/weather'
// const ICON_URL = `https://openweathermap.org/img/wn/${iconName}@2x.png`

// cityInput.value === '' ? searchingCity = 'Bishkek' : searchingCity = cityInput.value
// weatherRequest()

async function weatherRequest() {
  const response = await fetch(`${BASE_URL}?q=${searchingCity}&appid=${API_KEY}`)
  const data = await response.json()
  iconName = data.weather[0].icon
  console.log(iconName);
  icon.setAttribute('src', `https://openweathermap.org/img/wn/${iconName}@2x.png`)
  city.innerHTML = data?.name ? data?.name : 'Город не найден...'
  temp.innerHTML = data?.main?.temp ? Math.round(data?.main?.temp - 273) + '&deg;C' : '...'
  if (data.main.temp - 273 > 30) {
    temp.style.color = '#f91536'
  } else if (data.main.temp - 273 < 0) {
    temp.style.color = '#3671c6'
  } else {
    temp.style.color = 'white'
  }
}

const debounceCityInput = debounce(weatherRequest, 300)

cityInput.oninput = () => {
  searchingCity = cityInput.value
  debounceCityInput()
}

// DEBOUNCE
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