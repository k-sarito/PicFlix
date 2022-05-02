import React, { useState , useEffect } from "react";
import { getAllGroupWatch } from "../modules/local/SavedFlixManager";
import { getAllGroupWatchTV } from "../modules/local/SavedFlixManager";
import { GroupWatchTVCard } from "./GWShowCard";
import { GroupWatchMovieCard } from "./GWMovieCard";

export const GroupWatch = ({getLoggedInUser}) => {
    const [suggestedMovies, updateSuggestedMovies] = useState([])
    const [suggestedShows, updateSuggestedShows] = useState([])


    const getAllSuggestedMovies = () => {
        getAllGroupWatch()
        .then(allMovies => {
            updateSuggestedMovies(allMovies)
        })
    }

    const getAllSuggestedShows = () => {
        getAllGroupWatchTV()
        .then(allShows => {
            updateSuggestedShows(allShows)
        })
    }

    useEffect(() => {
        getAllSuggestedMovies()
    }, [])

    useEffect(() => {
        getAllSuggestedShows()
    }, [])


    return (
        <>
            <div className="group_display">
                <h2>Suggested Movies</h2>
                {suggestedMovies.map((singleMovie) => (<GroupWatchMovieCard movieObj={singleMovie} key={singleMovie.id} getLoggedInUser={getLoggedInUser}/>))}
            </div>
            <div className="group_display">
                <h2>Suggested Shows</h2>
                {suggestedShows.map((singleShow) => (<GroupWatchTVCard 
                TVObj={singleShow} key={singleShow.id} getLoggedInUser={getLoggedInUser}/>))}
            </div>
            
        </>
    )


}