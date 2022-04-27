import React from "react";
import "./MovieCard.css"
import { ButtonSort } from "../Utilities/Utilities";
import { Link } from "react-router-dom";

export const MovieCard = ({ movieObj, HandleSaveFlic, HandleSaveTV }) => {
    const imgURL = `https://image.tmdb.org/t/p/w200${movieObj?.poster_path}`
    return (
        <div className="movie_card">
            <div className="movie_card_content">
                <h4><span className="movie_name">{movieObj?.title}</span></h4>
                <h4><span className="movie_name">{movieObj?.name}</span></h4>
                <img src={imgURL}/>
                <input
                    type='hidden'
                    value={movieObj?.id}
                    id='movieId'
                ></input>
            </div>
            <div className="preveiw_btn_container">
                <ButtonSort movieObj={movieObj} HandleSaveFlic={HandleSaveFlic} HandleSaveTV={HandleSaveTV}/>
                {/* {() => {if(movieObj?.media_type === "tv"){
                    return <button type="button" id={movieObj?.id} onClick={HandleSaveTV}>Save</button>
                } else if (
                    movieObj?.media_type === "movie"
                ){
                    return <button type="button" id={movieObj?.id} onClick={HandleSaveFlic}>Save</button>
                }}} */}
            </div>
        </div>
    )
}