import React, { useEffect, useState } from "react";
import { getMovieStreaming } from "../modules/external/TMDBManager";
import "./SavedCard.css"


export const SavedMovieCard = ({movieObj}) => {
    const imgURL = `https://image.tmdb.org/t/p/w200${movieObj?.img}`
    const [seeDetails, updateSeeDetails] = useState(false)
    const [streaming, setStreaming] = useState([])

    // const getStreaming = (movieId) => {
    //     return getMovieStreaming(movieId)
    //     .then(streamers => {
    //         // streamers.map((singleService) => setStreaming(singleService.logo_path))
    //         setStreaming(streamers)
    //         // console.log(streamers)
    //     })
    // }

    // const DisplayStreaming = ({arr}) => {
    //     return (
    //         <>
    //             {arr.map((singleService) => (<img src={`https://image.tmdb.org/t/p/w200${singleService.logo_path}`}/>))}
    //         </>
    //     )
    // }

    // useEffect(() => {
    //     getStreaming(movieObj.movieId)
    // }, [])

    const MovieCardArr = [
        <div className="movie_card">
            <div className="movie_card_content">
                <h4><span className="movie_name">{movieObj?.name}</span></h4>
                <img src={imgURL}/>
                {/* <DisplayStreaming arr={streaming}/> */}
                {/* {console.log(streaming)} */}
                <input
                    type='hidden'
                    value={movieObj?.movieId}
                    id='movieId'
                ></input>
            </div>
            <div className="saved_movie_btn_container">
                <button className="saved_movie_details_btn" onClick={() => updateSeeDetails(true)} id={`details_btn_${movieObj.movieId}`}>Details</button>
                <button className="saved_movie_delete_btn">Delete</button>
            </div>
        </div>
        ,
        <div className="movie_card">
            <div className="movie_card_content">
                <h4><span className="movie_name">{movieObj?.name}</span></h4>
                <img src={imgURL}/>
                {/* <DisplayStreaming arr={streaming}/> */}
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
                <button className="saved_movie_delete_btn">Delete</button>
            </div>
        </div>
    ]

    return (
        seeDetails ? MovieCardArr[1] : MovieCardArr[0]
    )

}