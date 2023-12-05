const addModal = () =>{
    const modal = new bootstrap.Modal (document.getElementById(`addbtnmodal`))
    modal.show
}
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
const postMovie = async ({ title, rating, genre, summary }) => {
    const newMovie = {
        title,
        rating,
        genre,
        summary
    };
    const body = JSON.stringify(newMovie);

    const url = `http://localhost:3000/movies`;
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
   let {title, rating, genre, summary, id} = movie;
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
                        <button class="btn btn-secondary btn-sm btn-success dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Options
                        </button>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item edit-movie" data-movie-id="${id}"href="#"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
  <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
</svg>Edit Movie</a></li>
                            <li><a class="dropdown-item delete-movie" data-movie-id="${id}" href="#"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
</svg>Delete Movie</a></li>
                        </ul>
                    </div>
                </div>
                <p class="card-text"></p>
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">Rating : ${rating}</li>
                  <div class="progress">
                    <div class="progress-bar bg-success" role="progressbar" style="width: ${rating*10}%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                  </div>
                <li class="list-group-item">${genre}</li>
                 <li class="list-group-item">${summary}</li>
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
const getMoviesByGenre = async (genre) => {
    const allMovies = await getMovies();
    const filteredMovies = allMovies.filter(movie => movie.genre.toLowerCase().includes(genre.toLowerCase()));
    return filteredMovies;
};



// Add an event listener to each genre nav-link
document.querySelectorAll('.nav-link').forEach(navLink => {
    navLink.addEventListener('click', async (event) => {
        event.preventDefault();

        // Get the genre from the href attribute of the clicked nav-link
        const genre = event.target.textContent;

        // Fetch movies based on the selected genre
        const movies = await getMoviesByGenre(genre);

        // Render the movie elements
        await renderMovieElement(movies);
    });
});


//MAIN
(async ()=>{
    document.getElementById('searchbar').addEventListener('input', searchMovies);
    const movies = await getMovies();
    await renderMovieElement(movies);
    showContent();
    const addMovieBtn = document.querySelector("#addMovie");
    addMovieBtn.addEventListener("click", async e => {
        e.preventDefault();
        // grab all the input values
        const movie = {
            title: document.querySelector('#movieTitle').value,
            rating: document.querySelector('#movieRating').value,
            summary: document.querySelector('#movieSummary').value,
            genre: document.querySelector('#movieGenre').value,
        }
        await postMovie(movie);
        const movies = await getMovies();
        await renderMovieElement(movies);



    });
})();
