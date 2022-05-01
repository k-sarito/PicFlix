import React, { useState , useEffect } from "react";
import { getExclusiveFlix , getExclusiveTV} from "../modules/local/SavedFlixManager";
import { GroupSavedMovieCard } from "./GroupMovieCard";
import { GroupTVCard } from "./GroupTVCard";

export const GroupDisplay = ({getLoggedInUser}) => {
    const [friendsSavedMovies, setFriendsSavedMovies] = useState([])
    const [friendsSavedShows, setFriendsSavedShows] = useState([])
    const currentUser = getLoggedInUser()

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

    useEffect(() => {
        getNotMyTV(currentUser)
    }, [])

    useEffect(() => {
        getNotMyMovies(currentUser)
        
    }, [])


    return (
        <>
            <div className="group_display">
                <h2>Group Movies</h2>
                {friendsSavedMovies.map((singleMovie) => (<GroupSavedMovieCard movieObj={singleMovie} key={singleMovie.id} currentUser={currentUser} getLoggedInUser={getLoggedInUser}/>))}
            </div>
            <div className="group_display">
                <h2>Group Shows</h2>
                {friendsSavedShows.map((singleShow) => (<GroupTVCard TVObj={singleShow} key={singleShow.id} getLoggedInUser={getLoggedInUser}/>))}
            </div>
        </>
    )
}