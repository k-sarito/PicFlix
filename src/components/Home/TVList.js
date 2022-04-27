import React, {useState, useEffect}from "react";
import { TVCard } from "./TVCard";
import { useNavigate } from "react-router-dom";
import { saveFlic, saveTV } from "../modules/local/SavedFlixManager";
import { getMovieById, getPopularMovies, getMoviesByGenre, searchTMDB, getTvById, getPopularTV, getTVByGenre } from "../modules/external/TMDBManager";


export const TVList = ({getLoggedInUser}) => {
    const navigate = useNavigate()
    const [TV, setTV] = useState([])
    const [keyword, setKeyword] = useState({
        search_field : ""
    })

    const getTV = () => {
        return getPopularTV()
    }

    const genreInputChange = (event) => {
        let genre = event.target.value
        return getTVByGenre(genre)
        .then(tvshows => {
            return setTV(tvshows.results)
        })
    }

    const HandleSaveTV = (event) => {
        return getTvById(event.target.id)
        .then(newTV => {
            let addedTV = {
                tvId : `${newTV.id}`,
                userId : getLoggedInUser(),
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
        console.log(event.target.id)
        console.log('here')
        return getMovieById(event.target.id)
        .then(newMovie => {
            let addedMovie = {
                movieId : `${newMovie?.id}`,
                userId: getLoggedInUser(),
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

    const handleSearch = (e) => {
        e.preventDefault()
        return searchTMDB(keyword.search_field)
        .then(movies => {
           
            for ( let i = 0; i < movies.results.length; i++) {
                if(movies.results[i].known_for){
                    console.log(movies.results[i].known_for)
                    setTV(movies.results[i].known_for)
                    break
                } else {
                    setTV(movies.results)
                    break
                }
            }
        })
    }

    const handleInput = (event) => {
        const currentInput = {...keyword}

        currentInput[event.target.id] = event.target.value
        
        setKeyword(currentInput)
    }

    useEffect(() => {
        getTV().then(APItv => {
            return setTV(APItv.results)
        })
    }, [])

    return (
        <>
        <div className="search_bar">
            <label htmlFor="search_bar">Search</label>
            <input type="text" id="search_field" placeholder="Find something specific" onChange={handleInput} />
            <button type="button" id="search_btn" onClick={handleSearch}>Search</button>
        </div>
        <h4>Browse</h4>
        <button type="button" onClick={() => navigate("/")}>Movies</button>
        <select name="genres" id="genre_dropdown" onChange={genreInputChange}>
            <option value="---">Choose a Genre</option>
            <option value="10759">Action/Adventure</option>
            <option value="16">Animation</option>
            <option value="35">Comedy</option>
            <option value="80">Crime</option>
            <option value="99">Documentary</option>
            <option value="18">Drama</option>
            <option value="10751">Family</option>
            <option value="10762">Kids</option>
            <option value="9648">Mystery</option>
            <option value="10763">News</option>
            <option value="10764">Reality</option>
            <option value="10765">Sci-Fi/Fantasy</option>
            <option value="10767">Talk</option>
            <option value="10767">War/Politics</option>
            <option value="37">Western</option>
        </select>
        <div className="preview">
            {TV.map((singleShow) => (<TVCard TVObj={singleShow} key={singleShow.id} HandleSaveFlic={HandleSaveFlic} HandleSaveTV={HandleSaveTV}/>))}
            {/* <h4><span className="movie_name">{movie.title}</span></h4>
                <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}/>
                <p>{movie.overview}</p> */}

        </div>
        </>
        
    )

}