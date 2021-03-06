import React from "react";
import "./MovieCard.css"
import { ButtonSort } from "../Utilities/Utilities";
import { Link } from "react-router-dom";

//TODO Button Sort is where the magic happens here. 
export const MovieCard = ({ movieObj, HandleSaveFlic, HandleSaveTV }) => {
    const imgURL = `https://image.tmdb.org/t/p/w200${movieObj?.poster_path}`
    return (
        <div className="movie_card">
            <div className="movie_card_content">
                <div className="preview_title">
                    <h4><span className="movie_name">{movieObj?.title}</span></h4>
                    <h4><span className="movie_name">{movieObj?.name}</span></h4>
                </div>
                <img src={imgURL}/>
                <input
                    type='hidden'
                    value={movieObj?.id}
                    id='movieId'
                ></input>
            <div className="preveiw_btn_container">
                <ButtonSort movieObj={movieObj} HandleSaveFlic={HandleSaveFlic} HandleSaveTV={HandleSaveTV}/>
                
            </div>
            </div>
        </div>
    )
}