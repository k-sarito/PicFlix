import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MovieCard } from "./MovieCard";
import { saveFlic, saveTV } from "../modules/local/SavedFlixManager";
import { getMovieById, getPopularMovies, getMoviesByGenre, searchTMDB, getTvById } from "../modules/external/TMDBManager";
import "./MovieList.css"

export const MovieList = ({getLoggedInUser}) => {
    const navigate = useNavigate()
    const [movie, setMovie] = useState([])
    const [keyword, setKeyword] = useState({
        search_field : ""
    })
   

    //TODO BROWSE 1. Grabs the most popular movies regardless of genre

    const getMovie = () => {
        return getPopularMovies()
    }

    //TODO BROWSE 3. Called when genre dropdown menu is changed, calls for most popular movies by genre code, sets movie state with the responses

    const genreInputChange = (event) => {
        let genre = event.target.value
        return getMoviesByGenre(genre)
        .then(movies => {
            
           return setMovie(movies.results)
        })
    }

    //*-----------------------------------------------------SAVE-------------------------------------------------

    //TODO Movie Card is factoring whether an incoming media type is a movie or TV show, and assigning a different button for each. If either is clicked, creates an object with the desired info and posts to the movie or show sections of the database. 

    const HandleSaveTV = (event) => {
        return getTvById(event.target.id)
        .then(newTV => {
            let addedTV = {
                tvId : `${newTV.id}`,
                usersId : getLoggedInUser(),
                name: `${newTV.name}`,
                networks: `${newTV.networks.name}`,
                seasons: `${newTV.number_of_seasons}`,
                episodes: `${newTV.number_of_episodes}`,
                img: `${newTV.poster_path}`,
                rating:`${newTV.vote_average}`,
                overview: `${newTV.overview}`,
                groupWatch: false
            }
            saveTV(addedTV)
        })
    }
    
    const HandleSaveFlic = (event) => {
        // console.log(event.target.id)
        // console.log('here')
        
        getMovieById(event.target.id)
        .then(newMovie => {
            let addedMovie = {
                movieId : `${newMovie?.id}`,
                usersId: getLoggedInUser(),
                name: `${newMovie?.title}`,
                img: `${newMovie?.poster_path}`,
                overview: `${newMovie?.overview}`,
                release: `${newMovie?.release_date}`,
                runtime:`${newMovie?.runtime}`,
                rating: `${newMovie?.vote_average}`,
                groupWatch: false
            }
            // console.log(addedMovie)
            saveFlic(addedMovie)
            
        })
        
    }

    //*-----------------------------------------------SEARCH--------------------------------------------------------------

    // TODO SEARCH 2. Next, we take the keyword and slap it into the search fetch, and it sets the movie state with the results

    const handleSearch = (e) => {
        e.preventDefault()
        return searchTMDB(keyword.search_field)
        .then(movies => {
           
            for ( let i = 0; i < movies.results.length; i++) {
                //TODO SEARCH 3. This is a way to determine if the search result is an actor. Actors have a known_for key, and the movies inside are likely what the user is looking for. 
                if(movies.results[i].known_for){
                    console.log(movies.results[i].known_for)
                    setMovie(movies.results[i].known_for)
                    break
                } else {
                    setMovie(movies.results)
                    break
                }
            }
        })
    }

    //TODO SEARCH 1. First, handleInput watches the input field and with every change, sets the search_field key in the keyword object to the inputs' value
    
    const handleInput = (event) => {
        const currentInput = {...keyword}

        currentInput[event.target.id] = event.target.value
        
        setKeyword(currentInput)
    }

    //*-------------------------------------------USE EFFECTS---------------------------------------------------------------

    //TODO BROWSE 2. Initial useEffect on load, sets movie state with all popular movies

    useEffect(() => {
        getMovie().then(APImovie => {
                return setMovie(APImovie.results)
            })
            console.log(movie)
    }, [])

       

    

    return (
        <>
        <div className="search_bar">
            <label htmlFor="search_bar"></label>
            <input type="text" id="search_field" placeholder="Find something specific" onChange={handleInput} />
            <button type="button" id="search_btn" onClick={handleSearch}>Search</button>
        </div>
        <div className="above_preview">
            <button type="button" onClick={() => navigate("/home/tv")}>Switch to TV</button>
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
        </div>
        <div className="preview">
            {movie.map((singleMovie) => (<MovieCard movieObj={singleMovie} key={singleMovie.id} HandleSaveFlic={HandleSaveFlic} HandleSaveTV={HandleSaveTV}/>))}
            

        </div>
        </>
        
    )
}