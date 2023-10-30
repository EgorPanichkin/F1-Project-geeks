// Footer car

const ferrari = document.querySelector('.ferrari')
let rightPosition = -420
function moveCar() {
  rightPosition++
  ferrari.style.right = rightPosition + 'px'
}


window.addEventListener('scroll', function scrollEvent() {
  // console.log(this.scrollY);
  // console.log(document.body.offsetHeight);
  if (scrollY >= document.body.offsetHeight - window.innerHeight-10) {
    console.log('start');
    const int = setInterval(() => {
      moveCar()
      if (rightPosition > window.innerWidth) {
        console.log('stop');
        clearInterval(int)
      }
    }, 5);
    window.removeEventListener('scroll', scrollEvent)
  }
})

if (document.body.offsetHeight < window.innerHeight) {
  const int = setInterval(() => {
    moveCar()
    if (rightPosition > window.innerWidth) {
      console.log('stop');
      clearInterval(int)
    }
  }, 5)
}


// Modal window

const modalTrigger = document.querySelector('#btn-get')
const modal = document.querySelector('.modal')
const modalCloseBtn = document.querySelector('.modal_close')

modalTrigger.onclick = () => {openModal()}

modal.onclick = (event) => {
  if (event.target === modal || event.target === modalCloseBtn) closeModal()
}

function openModal() {
  modal.style.display = 'block'
  document.body.style.overflow = 'hidden'
}

function closeModal() {
  modal.style.display = 'none'
  document.body.style.overflow = ''
}

// Modal timer

setTimeout(() => {
  openModal()
}, 10000)


// Form Request

const form = document.querySelector('form')

async function sendRequest(form) {
  try {
    const formData = new FormData(form)
    const userObj ={}
    formData.forEach((element, index) => {
      userObj[index] = element
    })
    const response = await fetch('../server.php', {
      method: 'POST',
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify(userObj)
    })
    let jsonResp = await response.json()
    alert(`${jsonResp[0]}, заявка отправлена. Мы вам перезвоним на номер: ${jsonResp[1]}`)
  } catch (error) {
    console.log('ERROR');
  }
}

form.addEventListener('submit',(event) => {
  event.preventDefault()
  sendRequest(form)
})