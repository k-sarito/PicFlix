import React from "react";
import "./MovieCard.css"
import { ButtonSort } from "../Utilities/Utilities";
import { Link } from "react-router-dom";


export const TVCard = ({ TVObj, HandleSaveFlic, HandleSaveTV }) => {
    const imgURL = `https://image.tmdb.org/t/p/w200${TVObj?.poster_path}`
    return (
        <div className="movie_card">
            <div className="movie_card_content">
                <h4><span className="movie_name">{TVObj?.title}</span></h4>
                <h4><span className="movie_name">{TVObj?.name}</span></h4>
                <img src={imgURL}/>
                <input
                    type='hidden'
                    value={TVObj?.id}
                    id='movieId'
                ></input>
            </div>
            <div className="preveiw_btn_container">
            <button type="button" id={TVObj?.id} onClick={HandleSaveTV}>Save</button>
                
            </div>
        </div>
    )
}