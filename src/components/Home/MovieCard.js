import React from "react";
import "./MovieCard.css"
import { Link } from "react-router-dom";

export const MovieCard = ({ movieObj }) => {
    const imgURL = `https://image.tmdb.org/t/p/w200${movieObj.poster_path}`
    return (
        <div className="movie_card">
            <div className="movie_card_content">
                <h4><span className="movie_name">{movieObj.title}</span></h4>
                <img src={imgURL}/>
                <p>{movieObj.overview}</p>
            </div>
        </div>
    )
}