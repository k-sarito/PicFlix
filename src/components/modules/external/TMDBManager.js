import { APIKey } from "../../settings";

const mdbURL = 'https://api.themoviedb.org/3'

export const getPopularMovies = () => {
    return fetch (`${mdbURL}/movie/popular?api_key=${APIKey}&language=en-US&page=1&adult=false`, {"content-type" : "application/json"})
    .then(response => response.json())
    
}

export const getMoviesByGenre = (genre) => {
    return fetch (`${mdbURL}/discover/movie?api_key=${APIKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${genre}&watch_region=US&with_watch_monetization_types=flatrate`)
    .then(response => response.json())
}

export const searchTMDB = (keyword) => {
    return fetch (`${mdbURL}/search/multi?api_key=${APIKey}&language=en-US&query=${keyword}&page=1&include_adult=false&sort_by=popularity.desc`)
    .then(response => response.json())
    
}

export const getMovieById = (movieId) => {
    return fetch (`${mdbURL}/movie/${movieId}?api_key=${APIKey}&language=en-US`)
    .then(response => response.json())
}

export const getTvById = (tvId) => {
    return fetch (`${mdbURL}/tv/${tvId}?api_key=${APIKey}&language=en-US`)
    .then(response => response.json())
}

//*TV
// https://api.themoviedb.org/3/tv/115036?api_key=161a8b9dee252788644b3b74293c551a&language=en-US

// https://api.themoviedb.org/3/movie/414906?api_key=161a8b9dee252788644b3b74293c551a&language=en-US
//https://api.themoviedb.org/3/movie/popular?api_key=<<api_key>>&language=en-US&page=1
//*GENRE
//https://api.themoviedb.org/3/discover/movie?api_key=161a8b9dee252788644b3b74293c551a&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=Action&watch_region=US&with_watch_monetization_types=flatrate

//*SEARCH
// https://api.themoviedb.org/3/search/multi?api_key=161a8b9dee252788644b3b74293c551a&language=en-US&query=Tom Hanks&page=1&include_adult=false&sort_by=popularity.desc