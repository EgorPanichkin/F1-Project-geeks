// Phone check

const phoneInput = document.querySelector('#phone_input')
const phoneButton = document.querySelector('#phone_button')
const phoneResult = document.querySelector('#phone_result')
const phoneSelect = document.querySelector('#phone-selector')


const regPhone = /^\+996 [2579]\d{2} \d{2}-\d{2}-\d{2}$/

phoneSelect.addEventListener('change',() => {
  phoneInput.value = null
  switch (phoneSelect.value) {
    case ('1'):
      console.log('kgz')
      phoneInput.placeholder = '+996 XXX XX-XX-XX'
      regPhone = /^\+996 [2579]\d{2} \d{2}-\d{2}-\d{2}$/
      break;
    case ('2'):
      console.log('rus')
      phoneInput.placeholder = '+7 XXX XXX-XX-XX'
      regPhone = /^\+7 [9]\d{2} \d{3}-\d{2}-\d{2}$/
      break;
    case ('3'):
      console.log('usa')
      phoneInput.placeholder = '+1 XXX-XXX-XXXX'
      regPhone = /^\+1 [2-9]\d{2}-\d{3}-\d{4}$/
      break;
}
})

phoneButton.addEventListener('click', () => {
  if (regPhone.test(phoneInput.value)) {
    phoneResult.innerHTML = 'We will call you back'
    phoneResult.style.color = '#6cd3bf'
  } else {
    phoneResult.innerHTML = 'Unknown number'
    phoneResult.style.color = 'red'
  }
})

phoneInput.addEventListener('keydown', (event) => {
  if (event.code === 'Enter') {
    console.log('enter');
  }
})

// gmail check

const gmailButton = document.querySelector('#gmail_button')
const gmailInput = document.querySelector('#gmail_input')
const gmailResult = document.querySelector('#gmail_result')

let strLenth = gmailInput.value.lenth

// Имя пользователя может состоять из 6–30 знаков и содержать буквы латинского алфавита (a–z), цифры (0–9) и точки (.)

const regExp = /^[a-zA-Z0-9.]{6,30}@gmail.com$/;

function checkRegExp() {
  if (regExp.test(gmailInput.value)) {
    gmailResult.innerHTML = 'We will write you back'
    gmailResult.style.color = '#6cd3bf'
  } else {
    gmailResult.innerHTML = 'invalid e-mail adress'
    gmailResult.style.color = 'red'
  }
}

gmailButton.addEventListener('click', () => {
  checkRegExp()
})

gmailInput.addEventListener('keydown', (event) => {
  if (event.code == 'Enter'){
    checkRegExp()
  }
})