import React, {useState, useEffect} from "react";
import { getSavedFlixByUser, getSavedTVByUser } from "../modules/local/SavedFlixManager";
import { SavedMovieCard } from "./SavedMovieCard";
import { SavedTVCard } from "./SavedTVCard";
import { deleteMovie , deleteShow } from "../modules/local/SavedFlixManager";


export const MyFlix = ({getLoggedInUser}) => {
    const [savedMovies, setSavedMovies] = useState([])
    const [savedTV, setSavedTV] = useState([])

    const currentUser = getLoggedInUser()

    const getMyMovies = (userId) => {
        return getSavedFlixByUser(userId)
        .then(myMovies => {
            setSavedMovies(myMovies)
        })
    }

    const getMyTV = (userId) => {
        return getSavedTVByUser(userId)
        .then(myTV => {
            setSavedTV(myTV)
        })
    }

    const handleDeleteMovie = (movieId) => {
        deleteMovie(movieId)
        .then(() => getMyMovies(currentUser))
    }

    const handleDeleteShow = (showId) => {
        console.log(showId)
        deleteShow(showId)
        .then(() => getMyTV(currentUser))
    }

    useEffect(() => {
        getMyMovies(currentUser)
        
    }, [])

    useEffect(() => {
        getMyTV(currentUser)
        
    }, [])

    return (
        <div className="myFlix">
                <h2>My Movies</h2>
            <div className="myMovies_container">
                {savedMovies.map((singleMovie) => (<SavedMovieCard movieObj={singleMovie} key={singleMovie.id} getLoggedInUser= {getLoggedInUser} handleDeleteMovie={() => handleDeleteMovie(singleMovie.id)}/>))}

            </div>
            <h2>My Shows</h2>
            <div className="myTV_container">
                {savedTV.map((singleShow) => (<SavedTVCard TVObj={singleShow} key={singleShow.id} getLoggedInUser={getLoggedInUser} handleDeleteShow={() => handleDeleteShow(singleShow.id)} />))}
            </div>
        </div>
    )

}