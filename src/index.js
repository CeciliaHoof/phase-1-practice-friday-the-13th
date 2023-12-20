//Global
const baseURL = 'http://localhost:3000/movies';
let selectedMovie;

//Selectors
const nav = document.querySelector('#movie-list');
const detailImg = document.querySelector('#detail-image');
const title = document.querySelector('#title');
const released = document.querySelector('#year-released');
const description = document.querySelector('#description');
const watchedBtn = document.querySelector('#watched');
const bloodAmt = document.querySelector('#amount');
const bloodForm = document.querySelector('#blood-form');

//Fetches
function getAllMovies(url){
    fetch(url)
        .then(resp => resp.json())
        .then(movieArr => {
            renderAllMovies(movieArr)
            renderDetail(movieArr[0])})
}

//render functions
function renderAllMovies(moviesArr){
    moviesArr.forEach(movieObj => renderNav(movieObj))
}

function renderNav(movieObj){
    const img = document.createElement('img');
    img.src = movieObj.image;
    img.addEventListener('click', () => renderDetail(movieObj))
    nav.appendChild(img);
}

function renderDetail(movieObj){
    selectedMovie = movieObj;
    detailImg.src = movieObj.image;
    title.textContent = movieObj.title;
    released.textContent = movieObj.release_year;
    description.textContent = movieObj.description;
    let watchValue = movieObj.watched ? "watched" : "unwatched";
    watchedBtn.textContent = watchValue
    bloodAmt.textContent = movieObj.blood_amount;
    watchedBtn.id = movieObj.id;
}

//Event listeners and handlers
watchedBtn.addEventListener('click', toggleWatched)

function toggleWatched(){
    selectedMovie.watched = !selectedMovie.watched
    if(selectedMovie.watched){
        watchedBtn.textContent = "watched"
    }
    else{
        watchedBtn.textContent = "unwatched"
    }
}

bloodForm.addEventListener('submit', (e) => addBloodDrops(e))

function addBloodDrops(e){
    e.preventDefault();
    let newBlood = parseInt(e.target['blood-amount'].value);
    selectedMovie.blood_amount += newBlood;
    renderDetail(selectedMovie);
    bloodForm.reset();  
}

//Initializers
getAllMovies(baseURL)