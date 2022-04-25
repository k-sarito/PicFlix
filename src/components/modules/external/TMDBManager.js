import { APIKey } from "../../settings";

const mdbURL = 'https://api.themoviedb.org/3'

export const getPopularMovies = () => {
    return fetch (`${mdbURL}/movie/popular?api_key=${APIKey}&language=en-US&page=1&adult=false`, {"content-type" : "application/json"})
    .then(response => response.json())
    
}

export const getMovieById = (movieId) => {
    return fetch (`${mdbURL}/movie/${movieId}?api_key=${APIKey}&language=en-US`)
    .then(response => response.json())
}


// https://api.themoviedb.org/3/movie/414906?api_key=161a8b9dee252788644b3b74293c551a&language=en-US
//https://api.themoviedb.org/3/movie/popular?api_key=<<api_key>>&language=en-US&page=1