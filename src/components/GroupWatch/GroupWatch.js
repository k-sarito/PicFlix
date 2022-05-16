import React, { useState , useEffect } from "react";
import { getAllGroupWatch } from "../modules/local/SavedFlixManager";
import { getAllGroupWatchTV } from "../modules/local/SavedFlixManager";
import { GroupWatchTVCard } from "./GWShowCard";
import { GroupWatchMovieCard } from "./GWMovieCard";

export const GroupWatch = ({getLoggedInUser}) => {
    const [suggestedMovies, updateSuggestedMovies] = useState([])
    const [suggestedShows, updateSuggestedShows] = useState([])

    //*------------------------GROUP WATCH----------------------------------------------------------

    //TODO GROUP WATCH 2. These functions fetch all movies from the database with groupWatch true, pop them into the movie/show states that are then mapped and displayed. 

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

    //TODO GROUP WATCH 1. useEffects calling functions on load. 

    useEffect(() => {
        getAllSuggestedMovies()
    }, [])

    useEffect(() => {
        getAllSuggestedShows()
    }, [])


    return (
        <>
            <h2>Suggested Movies</h2>
            <div className="group_display">
                {suggestedMovies.map((singleMovie) => (<GroupWatchMovieCard movieObj={singleMovie} key={singleMovie.id} getLoggedInUser={getLoggedInUser}/>))}
            </div>
            <h2>Suggested Shows</h2>
            <div className="group_display">
                {suggestedShows.map((singleShow) => (<GroupWatchTVCard 
                TVObj={singleShow} key={singleShow.id} getLoggedInUser={getLoggedInUser}/>))}
            </div>
            
        </>
    )


}