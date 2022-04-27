import React, {useState, useEffect} from "react";
import { getSavedFlixByUser, getSavedTVByUser } from "../modules/local/SavedFlixManager";
import { SavedMovieCard } from "./SavedMovieCard";
import { SavedTVCard } from "./SavedTVCard";


export const MyFlix = ({getLoggedInUser}) => {
    const [savedMovies, setSavedMovies] = useState([])
    const [savedTV, setSavedTV] = useState([])

    const currentUser = getLoggedInUser()

    const getMyMovies = (userId) => {
        return getSavedFlixByUser(userId)
    }

    const getMyTV = (userId) => {
        return getSavedTVByUser(userId)
    }

    useEffect(() => {
        getMyMovies(currentUser)
        .then(myMovies => {
            setSavedMovies(myMovies)
        })
    }, [])

    useEffect(() => {
        getMyTV(currentUser)
        .then(myTV => {
            setSavedTV(myTV)
        })
    }, [])

    return (
        <div className="myFlix">
                <h2>My Movies</h2>
            <div className="myMovies_container">
                {savedMovies.map((singleMovie) => (<SavedMovieCard movieObj={singleMovie} key={singleMovie.id}/>))}

            </div>
            <h2>My Shows</h2>
            <div className="myTV_container">
                {savedTV.map((singleShow) => (<SavedTVCard TVObj={singleShow} key={singleShow.id}/>))}
            </div>
        </div>
    )

}