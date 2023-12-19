fetch('http://localhost:3000/movies')
    .then(resp => resp.json())
    .then(data => {
        addFirstMovie(data)
        createMovieNav(data)
        handleWatchedButton(data)
        addBloodDrops(data)})


const nav = document.querySelector('#movie-list');
const detailImg = document.querySelector('#detail-image')
const title = document.querySelector('#title');
const released = document.querySelector('#year-released');
const description = document.querySelector('#description');
const watchedBtn = document.querySelector('#watched');
const bloodAmt = document.querySelector('#amount');
const bloodForm = document.querySelector('#blood-form')

function createMovieNav(movieArr){
    movieArr.forEach(movie => {
        const img = document.createElement('img');
        img.src = movie.image;
        nav.appendChild(img);
        
        img.addEventListener('click', () => {
            addMovieDetail(movie);
        })
    });
}

function addFirstMovie(movieArr){
    const firstMovie = movieArr[0];
    addMovieDetail(firstMovie);
}

function addMovieDetail(movieObj){
    detailImg.src = movieObj.image;
    title.textContent = movieObj.title;
    released.textContent = movieObj.release_year;
    description.textContent = movieObj.description;
    if (movieObj.watched === true)
        {watchedBtn.textContent = "watched"}
    else
        {watchedBtn.textContent = "unwatched"}
    bloodAmt.textContent = movieObj.blood_amount;
    bloodAmt.id = movieObj.id;
    watchedBtn.id = movieObj.id;
}

function handleWatchedButton(moviesArr){
    watchedBtn.addEventListener('click', () => {
        let id = watchedBtn.id;
        let indexValue = id - 1;
        let movieObj = moviesArr[indexValue]
        let watchedStatus;
        if (movieObj.watched === true){
            watchedBtn.textContent = "unwatched"
            watchedStatus = false;
        }
        else {
            watchedBtn.textContent = "watched";
            watchedStatus = true;
        }
        movieObj.watched = watchedStatus;
        fetch(`http://localhost:3000/movies/${id}`, {
            method : 'PATCH',
            headers : {'Content-type' : 'application/json'},
            body : JSON.stringify(movieObj)
        })
    })
}

function addBloodDrops(movieArr){
    bloodForm.addEventListener('submit', (e) => {
        e.preventDefault();
        let id = bloodAmt.id;
        let indexValue = id - 1;
        let movieObj = movieArr[indexValue];
        let amountBloodAdd = parseInt(document.querySelector('#blood-amount').value);
        let currentBloodAmt = parseInt(bloodAmt.textContent);
        let newBloodAmt = amountBloodAdd + currentBloodAmt;
        bloodAmt.textContent = newBloodAmt;
        movieObj.blood_amount = newBloodAmt;
        fetch(`http://localhost:3000/movies/${id}`, {
            method : 'PATCH',
            headers : {'Content-type' : 'application/json'},
            body : JSON.stringify(movieObj)
        })
    })
}