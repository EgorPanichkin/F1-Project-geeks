// TABS SLIDER

const tabContent = document.querySelectorAll('.tab_content_block')
const tabsParent = document.querySelector('.tab_content_items')
const tabs = document.querySelectorAll('.tab_content_item')
let activeTab = 0

function hideTabContent() {
  tabContent.forEach((tabBlock) => {
    tabBlock.style.display = 'none'
  })
  tabs.forEach((tabItem) => {
    tabItem.classList.remove('tab_content_item_active')
  })
}

function showTabContent(indexElemrnt = 0) {
  tabContent[indexElemrnt].style.display = 'flex'
  tabs[indexElemrnt].classList.add('tab_content_item_active')
}

hideTabContent()
showTabContent(0)

tabsParent.addEventListener('click', (event) => {
  if (event.target.classList.contains('tab_content_item')){
    tabs.forEach((tabItem, tabIndex) => {
      if (event.target === tabItem) {
        hideTabContent()
        activeTab = tabIndex
        showTabContent(tabIndex)
      }
    })
  }
})

// Auto Tab Slider

function autoShow() {
  hideTabContent()
  activeTab = (activeTab + 1) % tabs.length
  showTabContent(activeTab)
}

setInterval(() => {autoShow()}, 5000);

// CARD SWITCHER

const card = document.querySelector('.card')
const btnPrev = document.querySelector('#btn-prev')
const btnNext = document.querySelector('#btn-next')
let id = 1

sendFetchResponse()

btnNext.onclick = () => {
  id = (id % 200) + 1
  sendFetchResponse()
}

btnPrev.onclick = () => {
  id = ((id + 198) % 200) + 1
  sendFetchResponse()
}


function sendFetchResponse() {
  fetch(`https://jsonplaceholder.typicode.com/todos/${id}`)
    .then(response => response.json())
    .then(data => {
      card.innerHTML = `
        <p>${data.title}</p>
        <p style="color: ${data.completed ? 'green' : 'red'}">${data.completed}</p>
        <span>${data.id}</span>
      `
    })
}

fetch(`https://jsonplaceholder.typicode.com/posts`)
  .then(response => response.json())
  .then(data => console.log(data))