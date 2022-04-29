import React, {useEffect, useState} from "react";

export const GroupSavedMovieCard = ({movieObj, currentUser}) => {
    const imgURL = `https://image.tmdb.org/t/p/w200${movieObj?.img}`
    const [seeDetails, updateSeeDetails] = useState(false)

    const MovieCardArr = [
        <div className="movie_card">
            <div className="movie_card_content">
                <h4><span className="movie_name">{movieObj?.name}</span></h4>
                <h5><span className="user_name">Saved By: {movieObj?.users.name}</span></h5>
                <img src={imgURL}/>
                
                <input
                    type='hidden'
                    value={movieObj?.movieId}
                    id='movieId'
                ></input>
            </div>
            <div className="saved_movie_btn_container">
                <button className="saved_movie_details_btn" onClick={() => updateSeeDetails(true)} id={`details_btn_${movieObj.movieId}`}>Details</button>
                {/* {()=> {if(currentUser === movieObj?.usersId){
                    return <button className="saved_movie_delete_btn">Delete</button>

                } else {return ''}}} */}
            </div>
        </div>
        ,
        <div className="movie_card">
            <div className="movie_card_content">
                <h4><span className="movie_name">{movieObj?.name}</span></h4>
                <img src={imgURL}/>
                
                <input
                    type='hidden'
                    value={movieObj?.movieId}
                    id='movieId'
                ></input>
            </div>
            <div className="movie_card_details">
                <p>Overview: {movieObj.overview}</p>
                <p>Release: {movieObj.release}</p>
                <p>Runtime: {movieObj.runtime}min</p>
                <p>Rating: {movieObj.rating}</p>
            </div>
            <div className="saved_movie_btn_container">
                <button className="saved_movie_details_btn" onClick={() => updateSeeDetails(false)} id={`details_btn_${movieObj.movieId}`}>Details</button>
                {/* {()=> {if(currentUser === movieObj?.usersId){
                    return <button className="saved_movie_delete_btn">Delete</button>

                } else {return ''}}} */}
            </div>
        </div>
    ]

    return (
        seeDetails ? MovieCardArr[1] : MovieCardArr[0]
    )
}