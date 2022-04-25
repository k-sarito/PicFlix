import React, { useState, useEffect } from "react";
import { MovieCard } from "./MovieCard";
import { getMovieById, getPopularMovies } from "../modules/external/TMDBManager";

export const MovieList = () => {
    // const [movie, setMovie] = useState({})
    const [movie, setMovie] = useState([])


    const getMovie = () => {
        return getPopularMovies()
        }
    

        useEffect(() => {
            getMovie().then(APImovie => {
                return setMovie(APImovie.results)
            })
            console.log(movie)
        }, [])

        // useEffect(() => {
        //     getMovie().then(APImovie => {
        //         return setMovie(APImovie.results[19])
        //     })
        //     console.log(movie)
        // }, [])

    

    return (
        <div>
            {movie.map((singleMovie) => (<MovieCard movieObj={singleMovie} key={singleMovie.id}/>))}
            {/* <h4><span className="movie_name">{movie.title}</span></h4>
                <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}/>
                <p>{movie.overview}</p> */}

        </div>
        
    )
}