fetch("http://localhost:3000/movies")
    .then(resp => resp.json())
    .then(data => {
        movieArr = data;
        createMovieList(movieArr);
        addMovieInfo(movieArr[0]);
        buttonHandler();
        bloodCount();

    })
    //.then(data => buttonHandler(data))
    //.then(data => addMovieInfo(data))

let movieArr;
let currentMovieObj;
const nav = document.querySelector("nav");
const movieImage = document.querySelector("#detail-image");
const movieTitle = document.querySelector("#title");
const movieRelease = document.querySelector("#year-released");
const movieDes = document.querySelector("#description");
const watchedButton = document.querySelector('#watched');
const bloodNum = document.querySelector('#amount');

function createMovieList(moviesArr){
    moviesArr.forEach((movie) => {
        let img = document.createElement('img')
        img.src = movie.image;
        nav.appendChild(img);
        img.addEventListener('click', () => {
            addMovieInfo(movie);
        })
    })
    return moviesArr;
}

function addMovieInfo(movieInfoObj){
    currentMovieObj = movieInfoObj;

    movieImage.src = movieInfoObj.image;
    movieTitle.textContent = movieInfoObj.title;
    movieRelease.textContent = movieInfoObj.release_year;
    movieDes.textContent = movieInfoObj.description;
    if (movieInfoObj.watched === false){
        watchedButton.textContent = "unwatched"
    }
    else {
        watchedButton.textContent = "watched"
    }
    bloodNum.textContent = movieInfoObj.blood_amount;
}

function buttonHandler(){
    watchedButton.addEventListener('click', () => {
        if (currentMovieObj.watched === false){
            watchedButton.textContent = "watched"
            currentMovieObj.watched = true;}
        else {
            watchedButton.textContent = "unwatched";
            currentMovieObj.watched = false;
        }
    })
}

function bloodCount() {
    const bloodForm = document.querySelector("#blood-form");
    bloodForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const amountToAdd = event.target["blood-amount"].value;
        currentMovieObj.blood_amount = amountToAdd;

        bloodNum.textContent = currentMovieObj.blood_amount;

        event.target.reset();
    })
}