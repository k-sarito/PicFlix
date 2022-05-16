import React, { useState , useEffect } from "react";
import { getExclusiveFlix , getExclusiveTV} from "../modules/local/SavedFlixManager";
import { GroupSavedMovieCard } from "./GroupMovieCard";
import { GroupTVCard } from "./GroupTVCard";
import "./Group.css"

export const GroupDisplay = ({getLoggedInUser}) => {
    const [friendsSavedMovies, setFriendsSavedMovies] = useState([])
    const [friendsSavedShows, setFriendsSavedShows] = useState([])
    const currentUser = getLoggedInUser()

    //*----------------------------------------GROUP MOVIES/TV-------------------------------------

    //TODO GROUP 2. These functions grab all saved media in the database, excluding one userId. We pass into it the currently logged in user and it returns everyone else's data. 

    const getNotMyMovies = (userId) => {
        getExclusiveFlix(userId)
        .then(movies => {
            setFriendsSavedMovies(movies)
            // console.log(friendsSavedMovies)
        })
    }
    
    const getNotMyTV = (userId) => {
        getExclusiveTV(userId)
        .then(shows => {
            setFriendsSavedShows(shows)
        })
    }

    //TODO GROUP 1. On load, calls the above functions

    useEffect(() => {
        getNotMyTV(currentUser)
    }, [])

    useEffect(() => {
        getNotMyMovies(currentUser)
        
    }, [])


    return (
        <>
            <h2>Group Movies</h2>
            <div className="group_display">
                {friendsSavedMovies.map((singleMovie) => (<GroupSavedMovieCard movieObj={singleMovie} key={singleMovie.id} getLoggedInUser={getLoggedInUser}/>))}
            </div>
            <h2>Group Shows</h2>
            <div className="group_display">
                {friendsSavedShows.map((singleShow) => (<GroupTVCard TVObj={singleShow} key={singleShow.id} getLoggedInUser={getLoggedInUser}/>))}
            </div>
        </>
    )
}