const api_key = "13fc3374-686b-4a9b-adf3-2a6ab2241584";
const api_key_url = "https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=1";
const api_url_search = "https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword="
getMovies(api_key_url)

async function getMovies(url) {
    const resp = await fetch(url, {
        headers: {
            "content-type": "application/json",
            "X-API-KEY": api_key,
        },
    })
    const respData = await resp.json();
    showMovies(respData);
}

function getClassByRate(vote){
    if(vote >= 7) { 
        return "green"; 
    }else if(vote >= 5){ 
        return "orange"; 
    }else {
        return "red";
    }
}



function showMovies(data){
    const moviesEl = document.querySelector(".movies");

    document.querySelector(".movies").innerHTML = "";

    data.films.forEach((movie) => {
        const movieEl = document.createElement("div")
        movieEl.classList.add("movie");
        movieEl.innerHTML = `
                <div class="movie__cover-inner">
                    <img class="movie_cover" src="${movie.posterUrl}" alt="${movie.nameOriginal}">
                    <div class="movie__cover--darkened"></div>
                </div>
                <div class="movie__info">
                    <div class="movie__title">"${movie.nameRu}"</div>
                    <div class="movie__category">${movie.genres.map(genre => genre.genre).join(', ')}</div>
                    ${movie.rating && `
                    <div class="movie__average movie__average--${getClassByRate(movie.rating)}">${movie.rating}</div>
                    `}
                </div>
        `;
        
        moviesEl.appendChild(movieEl);
    });
}

const form = document.querySelector("form");
const search = document.querySelector(".header__search");

form.addEventListener('submit', (e) =>{
    e.preventDefault()

    const apiSearchUrl = `${api_url_search}${search.value}`

    if(search.value){
        getMovies(apiSearchUrl)
        search.value = '';
    }

});