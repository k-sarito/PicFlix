import React, { useState, useEffect } from "react";
import { MovieCard } from "./MovieCard";
import { getMovieById, getPopularMovies, getMoviesByGenre, searchTMDB } from "../modules/external/TMDBManager";

export const MovieList = () => {
    // const [movie, setMovie] = useState({})
    const [movie, setMovie] = useState([])
    const [keyword, setKeyword] = useState({
        search_field : ""
    })


    const getMovie = () => {
        return getPopularMovies()
    }

    const genreInputChange = (event) => {
        let genre = event.target.value
        return getMoviesByGenre(genre)
        .then(movies => {
            
           return setMovie(movies.results)
        })
    }

    const handleSearch = () => {
        
        return searchTMDB(keyword.search_field)
        .then(movies => {
            
            return setMovie(movies)
        })
    }
    
    const handleInput = (event) => {
        const currentInput = {...keyword}

        currentInput[event.target.id] = event.target.value
        
        setKeyword(currentInput)
    }

    useEffect(() => {
        getMovie().then(APImovie => {
                return setMovie(APImovie.results)
            })
            console.log(movie)
    }, [])

       

    

    return (
        <>
        <div className="search_bar">
            <label htmlFor="search_bar">Search</label>
            <input type="text" id="search_field" placeholder="Find something specific" onChange={handleInput} />
            <button type="button" id="search_btn" onClick={handleSearch}>Search</button>
        </div>
        <h4>Browse</h4>
        <select name="genres" id="genre_dropdown" onChange={genreInputChange}>
            <option value="---">Choose a Genre</option>
            <option value="28">Action</option>
            <option value="12">Adventure</option>
            <option value="16">Animation</option>
            <option value="35">Comedy</option>
            <option value="80">Crime</option>
            <option value="99">Documentary</option>
            <option value="18">Drama</option>
            <option value="10751">Family</option>
            <option value="14">Fantasy</option>
            <option value="36">History</option>
            <option value="27">Horror</option>
            <option value="10402">Music</option>
            <option value="9648">Mystery</option>
            <option value="10749">Romance</option>
            <option value="878">Sci-Fi</option>
            <option value="53">Thriller</option>
            <option value="10752">War</option>
            <option value="37">Western</option>
        </select>
        <div className="preview">
            {movie.map((singleMovie) => (<MovieCard movieObj={singleMovie} key={singleMovie.id}/>))}
            {/* <h4><span className="movie_name">{movie.title}</span></h4>
                <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}/>
                <p>{movie.overview}</p> */}

        </div>
        </>
        
    )
}