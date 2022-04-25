import React from "react";
import "./MovieCard.css"
import { Link } from "react-router-dom";

export const MovieDetails = ({ movieObj }) => {
    const imgURL = `https://image.tmdb.org/t/p/w200${movieObj.poster_path}`
    return (
        <div className="movie_card">
            <div className="movie_card_content">
                <h4><span className="movie_name">{movieObj.title}</span></h4>
                <img src={imgURL}/>
                <p>{movieObj.overview}</p>
                <p>Release Date:{movieObj.release_date}</p>
                <p>Runtime: {movieObj.runtime} min</p>
                <p>{movieObj.vote_average}</p>
                <a href={movieObj.homepage} target="_blank">Website</a>
                <input
                    type='hidden'
                    value={movieObj.id}
                    id='movieId'
                ></input>
            </div>
        </div>
    )
}