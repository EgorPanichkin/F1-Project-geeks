// Fetch card request
const url = 'https://jsonplaceholder.typicode.com/posts'
const peoplesInner = document.querySelector('.peoples-inner')

const requestData = async() => {
    try {
      const response = await fetch(url)
      const data = await response.json()
      console.log(data)
      data.forEach((userData) => {
        console.log(userData.title);
        const card = document.createElement('div')
        card.setAttribute('class', 'card')
        card.innerHTML = `
          <img src='../img/stig.png' alt='user' class='user-avatar'>
          <h4 class='user-header'>${userData.title}</h4>
          <p class='user-text'>${userData.body}</p>
        `
        peoplesInner.append(card)
      });
    } catch (error) {
      console.log(`Error: ${error.message}`);
    }
}

requestData()