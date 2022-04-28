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

export const getPopularTV = () => {
    return fetch (`${mdbURL}/tv/popular?api_key=${APIKey}&language=en-US&watch_region=US&page=1`)
    .then(response => response.json())
}

export const getTVByGenre = (genreId) => {
    return fetch (`${mdbURL}/discover/tv?api_key=${APIKey}&language=en-US&sort_by=popularity.desc&watch_region=US&page=1&include_null_first_air_dates=false&with_watch_monetization_types=flatrate&with_genres=${genreId}`)
    .then(response => response.json())
}

export const getMovieStreaming = (movieId) => {
    return fetch (`${mdbURL}/movie/${movieId}/watch/providers?api_key=${APIKey}`)
    .then(response => response.json())
    .then(allProviders => {
        return allProviders.results.US?.flatrate
    })
}

