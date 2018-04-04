// elements
const mainContainer = document.querySelector('.main-container');
const container = document.querySelector('.container');
const searchInput = document.querySelector('#searchInput');
const buttons = document.querySelector('.buttons');
const searchBtn = document.querySelector('#searchBtn');
const randomBtn = document.querySelector('#randomBtn');
const h1 = document.querySelector('#logo')

// functions
function topBarSetUp() {
    container.classList.remove('container');
    container.classList.add('top-bar');
    searchBtn.textContent = '';
    searchBtn.classList.add('ion-android-arrow-forward');
    randomBtn.remove();
}

function addUl(json) {
    if (json.servedby) {
        const errorDiv = `
                        <div class="error-div">
                            <div>
                                <p>4<i class="ion-bug"></i>4</p>
                                <p>Make sure to provide a value!</p>
                            </div>
                        </div>`
        mainContainer.insertAdjacentHTML('beforeend', errorDiv);
        topBarSetUp()
    }
    console.log(json);
    const ul = document.createElement('ul');
    for (let i = 0; i < json[1].length; i++) {
        const li = `
                    <li>
                        <a href="${json[3][i]}" target="_blank">${json[1][i]}</a>
                        <p>${json[2][i]}</p>
                    </li>`
        ul.insertAdjacentHTML('beforeend', li);
    }
    container.after(ul);
    searchInput.value = '';
    topBarSetUp()
}

function createXHR() {
    const xhr = new XMLHttpRequest;
    xhr.onreadystatechange = function() {
        if (this.readyState === 4) {
            if(xhr.status === 200) {
                const json = JSON.parse(xhr.responseText);
                if (container.nextElementSibling) {
                    container.nextElementSibling.remove();
                    addUl(json);
                } else {
                    addUl(json);
                }
            }
        }
    }
    const API_URL = 'https://en.wikipedia.org/w/api.php?action=opensearch&format=json&origin=*&search=' + searchInput.value + '&limit=10'
    xhr.open('GET', API_URL, true);
    xhr.send();
}

// Events
searchBtn.addEventListener('click', function() {
   createXHR();
});

searchInput.addEventListener('keydown', function(e) {
    if (e.keyCode === 13) {
        createXHR();
    }
})

h1.addEventListener('click', function() {
    container.classList.remove('top-bar');
    container.classList.add('container');
    buttons.appendChild(randomBtn);
    searchBtn.classList.remove('ion-android-arrow-forward');
    searchBtn.textContent = 'Wikipedia Search';
    container.nextElementSibling.remove();
})

