import React, {useState, useEffect} from "react";
import { getSavedFlixByUser, getSavedTVByUser } from "../modules/local/SavedFlixManager";
import { SavedMovieCard } from "./SavedMovieCard";
import { SavedTVCard } from "./SavedTVCard";
import { deleteMovie , deleteShow } from "../modules/local/SavedFlixManager";


export const MyFlix = ({getLoggedInUser}) => {
    const [savedMovies, setSavedMovies] = useState([])
    const [savedTV, setSavedTV] = useState([])

    const currentUser = getLoggedInUser()


    //* ------------------- FIDO, FETCH --------------------------------------------------

    //TODO SAVED 1. These functions are built to grab a user's saved movies and shows. Head down to the useEffects to see the pulse-pounding sequel. 

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

    //*-------------------------DELETE------------------------------------------------------

    //TODO DELETE Defines the delete functions. These are passed down as props into the Card functions. 

    const handleDeleteMovie = (movieId) => {
        deleteMovie(movieId)
        .then(() => getMyMovies(currentUser))
    }

    const handleDeleteShow = (showId) => {
        console.log(showId)
        deleteShow(showId)
        .then(() => getMyTV(currentUser))
    }

    //*-----------------------------USE EFFECTS----------------------------------------------

    //TODO SAVED 2. Welcome back. On page load, these babies plug the current user's Id into the functions, so we grab just your saved data. 

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