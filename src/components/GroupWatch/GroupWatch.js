import React, { useState , useEffect } from "react";
import { getAllGroupWatch } from "../modules/local/SavedFlixManager";
import { GroupWatchMovieCard } from "./GWMovieCard";

export const GroupWatch = ({getLoggedInUser}) => {
    const [suggestedMovies, updateSuggestedMovies] = useState([])


    const getAllSuggestedMovies = () => {
        getAllGroupWatch()
        .then(allMovies => {
            updateSuggestedMovies(allMovies)
        })
    }

    useEffect(() => {
        getAllSuggestedMovies()
    }, [])


    return (
        <>
            <div className="group_display">
                <h2>Group Movies</h2>
                {suggestedMovies.map((singleMovie) => (<GroupWatchMovieCard movieObj={singleMovie} key={singleMovie.id} getLoggedInUser={getLoggedInUser}/>))}
            </div>
            
        </>
    )


}