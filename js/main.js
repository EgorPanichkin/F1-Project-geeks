// Color changer

const hex = '123456789ABCDEF'
let color = ''
let idNum

function randColor() {
  color = '#'
  for (let i = 0; i < 6; i++) {
    color +=(hex[Math.floor(Math.random() * hex.length)]);
  }
  return color
}

function randSpan() {
  return idNum = (Math.floor(Math.random() * 4))+1
}


const colorBtns = document.querySelectorAll('.color-btn')
console.log(colorBtns);

for (let i = 0; i <= (colorBtns.length - 2); i++) {
  randColor()
  colorBtns[i].innerText = color
  colorBtns[i].style.color = color
  colorBtns[i].addEventListener('click', (event) => {
    randSpan()
    let span = document.getElementById(`${idNum}`)
    span.style.color = event.target.innerHTML
    console.log(event.target.innerHTML);
  })
}

colorBtns[4].addEventListener('click', () => {
  for (let i = 0; i <= (colorBtns.length - 2); i++) {
    randColor()
    colorBtns[i].innerText = color
    colorBtns[i].style.color = color
  }
})


// Card Slider
const cards = document.querySelectorAll('.tracks__card')
const prewBtn = document.querySelector('#prew-btn')
const nextBtn = document.querySelector('#next-btn')

prewBtn.addEventListener('click', () => {
  prewSlide(cards)
})

nextBtn.addEventListener('click', () => {
  nextSlide(cards)
})

function prewSlide(cardsList) {
  for (let i = 0; i < cardsList.length; i++) {
    if (cardsList[i].classList.value == 'tracks__card active') {
      cardsList[i].classList.remove('active')
      if (i === 0) {
        i = 8
        cardsList[i].classList.add('active')
      } else {
        i--
        cardsList[i].classList.add('active')
      }
    };
  }
}

function nextSlide(cardsList) {
  for (let i = 0; i < cards.length; i++) {
    if (cardsList[i].classList.value == 'tracks__card active') {
      cardsList[i].classList.remove('active')
      if (i === (cardsList.length - 1)) {
        i = 0
        cards[i].classList.add('active')
      } else {
        i++
        cardsList[i].classList.add('active')
      }
    };
  }
}

let autoSlider = setInterval(() => {nextSlide(cards)}, 8000)