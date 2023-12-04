
function showContent() {

    document.getElementById('loading-screen').style.display = 'none';

    document.getElementById('movieCard').style.display = 'block';
}
setTimeout(showContent, 3000);
const getMovies = async () => {
    const url = "http://localhost:3000/movies";
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    };
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
};
const getMovie = async (id) => {
    const url = `  http://localhost:3000/movies${id}`;
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    };
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
};

const deleteMovie = async (id) => {
    const url = `  http://localhost:3000/movies/${id}`;
    const options = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    };
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
};
 const postMovie = async ({ title,rating }) => {
    const newBook = {
        title,
        rating,
    };
    const body = JSON.stringify(newBook);

    const url = `  http://localhost:3000/movies`;
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: body,
    };
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
};

const createMovieElement = (movie) =>{
   let {title, rating, Genre, id} = movie;
   title = movie.title;
   rating = movie.rating;
   id = movie.id;
    const movieElement = document.createElement("div")
    movieElement.innerHTML = ` 
    <div class="card" style="width: 18rem;">
            <div class="card-body">
                <div class="d-flex justify-content-between align-items-center">
                    <h5 class="card-title">${title}</h5>
                    <div class="btn-group">
                        <button class="btn btn-secondary btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Options
                        </button>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="#">Edit Movie</a></li>
                            <li><a class="dropdown-item delete-movie" data-movie-id="${id}" href="#">Delete Movie</a></li>
                        </ul>
                    </div>
                </div>
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">Rating : ${rating}</li>
                <li class="list-group-item">${id}</li>
                <li class="list-group-item">A third item</li>
            </ul>
            <div class="card-body">
            </div>
        </div>
    </div>`;
    const deleteButton = movieElement.querySelector('.delete-movie');
    deleteButton.addEventListener('click', async () => {
        const movieId = deleteButton.getAttribute('data-movie-id');
        await deleteMovie(movieId);
        movieElement.remove();
    });

    return movieElement;
}
const renderMovieElement = async (movies) =>{
    const parentElement = document.querySelector("#movieCard")
    console.log(parentElement)
    const moviesFragment = document.createDocumentFragment();
    for(let movie of movies) {
        const movieCard = createMovieElement(movie);
        moviesFragment.appendChild(movieCard);
    }
    parentElement.innerHTML = '';
    parentElement.appendChild(moviesFragment);
}

const searchMovies = async () => {
    const searchTerm = document.getElementById('searchbar').value.toLowerCase();
    const allMovies = await getMovies();
    const filteredMovies = allMovies.filter(movie => movie.title.toLowerCase().includes(searchTerm));
    await renderMovieElement(filteredMovies);
};

document.getElementById('searchbar').addEventListener('input', searchMovies);


//MAIN
(async ()=>{
    const movies = await getMovies();
    await renderMovieElement(movies)
    showContent()
    moviePost()
})();