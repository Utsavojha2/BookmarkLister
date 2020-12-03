  const addBookmarks = document.querySelector('#show-modal');
const bookmarksContainer = document.querySelector('#bookmarks-container');
const modalContainer = document.querySelector('.modal-container');
const closeModal = document.querySelector('#close-modal');
const bookmarkForm = document.querySelector('#bookmark-form');
const websiteName = document.querySelector('#website-name');
const websiteURL = document.querySelector('#website-url');

let bookmarkUI = [];

function showModal(e){
    modalContainer.classList.add('show-modal');
    websiteName.placeholder = 'Enter website name';
    websiteURL.placeholder = 'Enter your website URL';
    websiteName.focus();
}

// Build bookmarks in DOM
function buildBookmarks(){
    // Remove all bookmark element
    bookmarksContainer.textContent = '';
    // Build items
    bookmarkUI.forEach((el) => {
        const {name, url} = el;
        const item = document.createElement('div');
        item.classList.add('item');
        const nameEl = document.createElement('div');
        nameEl.classList.add('name');
        nameEl.innerHTML = ` 
        <i class="fas fa-times-circle" onclick="deleteBookmark('${url}')" id="delete-bookmark"></i>
        <img src="https://s2.googleusercontent.com/s2/favicons?domain=${url}" alt="">
        <a href="${url}" target="_blank">${name}</a>`;
        item.appendChild(nameEl);
        // console.log(item);
        bookmarksContainer.appendChild(item);
        console.log(url);
    })
}

function deleteBookmark(urlink){
    for(let i = 0; i < bookmarkUI.length; i++){ 
        if(bookmarkUI[i].url === urlink){
            bookmarkUI.splice(i, 1);
        }
    }
    // Update bookmarks array in localStorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarkUI));
    fetchBookmarks();
    console.log(bookmarkUI);
}

// Fetch bookmarks
function fetchBookmarks(){
    // Get bookmarks from local storage is available
    if(localStorage.getItem('bookmarks')){
        bookmarkUI = JSON.parse(localStorage.getItem('bookmarks'));
    } else {
        // Create a bookmarks array in local storage
        bookmarkUI = [
            {
                name : 'Utsav Ojha',
                url : 'https://manutd.com'
            }
        ]
        localStorage.setItem('bookmarks', JSON.stringify(bookmarkUI));
   }
   buildBookmarks();
 
}

function implementBookmark(e){
    e.preventDefault();
    if (!websiteURL.value.includes('http://', 'https://')){
        websiteURL.value = `https://${websiteURL.value}`;
    } 
    if(!validateURL(websiteName.value, websiteURL.value)){
        return false;
    }
    const bookmark = {
        name : websiteName.value,
        url : websiteURL.value
    }
    bookmarkUI.push(bookmark);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarkUI));
    fetchBookmarks();
    closeTheModal();
}

function validateURL(nameValue, URLvalue){
  const re = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;
  const regex = new RegExp(re);
  if(!nameValue || !URLvalue){
      websiteName.style.borderColor = 'red';
      websiteURL.style.borderColor = 'red';
      alert('Please submit value for both fields');
      return false;
  }
  if(!URLvalue.match(regex)){ 
      alert('Please provide a valid web address');
      return false;
  }

  return true;
}

function closeTheModal(){
    modalContainer.classList.remove('show-modal');
    websiteName.style.borderColor = 'white';
    websiteURL.style.borderColor = 'white';
    websiteName.value = '';
    websiteURL.value = '';
}


// Event Listener
addBookmarks.addEventListener('click', showModal);
bookmarkForm.addEventListener('submit', implementBookmark);
closeModal.addEventListener('click', closeTheModal);
window.addEventListener('click', e => {
   if(e.target.classList.contains('modal-container')){
       closeTheModal();
   } 
})
//ON Load
fetchBookmarks();


