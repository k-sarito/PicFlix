import React, { useEffect, useState } from "react";
import { getMovieStreaming } from "../modules/external/TMDBManager";
import { getCommentsByMovieId , postComment } from "../modules/local/CommentManager";
import { CommentCard } from "../comments/CommentCard";
import { Modal } from "../modal/Modal";
import "./SavedCard.css"


export const SavedMovieCard = ({movieObj, getLoggedInUser}) => {
    const imgURL = `https://image.tmdb.org/t/p/w200${movieObj?.img}`
    const [seeDetails, updateSeeDetails] = useState(false)
    const [movieComments, setMovieComments] = useState([])
    const [currentComment, setCurrentComment] = useState({
        body: ""
    })
    const [show, setShow] = useState(false)
    const [streaming, setStreaming] = useState([])
    const currentUser = getLoggedInUser()

    const getComments = (movieId) => {
        setShow(true)
        return getCommentsByMovieId(movieId)
        .then(comments => (setMovieComments(comments)))
    }
    const handleInput = (event) => {
        const currentInput = {...currentComment}

        currentInput[event.target.id] = event.target.value

        setCurrentComment(currentInput)
        // console.log(currentComment.body)
    }
    
    const handlePostComment = () => {
        const selection = {...currentComment}
        const today = new Date()
        let newComment = {
            usersId: currentUser,
            savedFlixId: movieObj.id,
            body: `${selection.body}`,
            timestamp: today 
        }

        postComment(newComment).then(setShow(false))
    }

    

    const MovieCardArr = [
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
            <div className="saved_movie_btn_container">
                <button className="saved_movie_details_btn" onClick={() => updateSeeDetails(true)} id={`details_btn_${movieObj.movieId}`}>Details</button>
                <button onClick={() => getComments(movieObj.id)}>Comments</button>
                <Modal onClose={() => setShow(false)} show={show} name={movieObj.name} textId="body" handleInput={handleInput} onSubmit={() => handlePostComment()} >
                    {movieComments.map((comment) => (<CommentCard commentObj={comment} key={comment.id}/>))}
                </Modal>
                <button className="saved_movie_delete_btn">Delete</button>
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
                <button className="saved_movie_details_btn" onClick={() => updateSeeDetails(false)} id={`details_btn_${movieObj.movieId}`}>Close Details</button>
                <button onClick={() => getComments(movieObj.id)}>Comments</button>
                <Modal onClose={() => setShow(false)} show={show} name={movieObj.name} textId="body" handleInput={handleInput} onSubmit={() => handlePostComment()} >
                    {movieComments.map((comment) => (<CommentCard commentObj={comment} key={comment.id}/>))}
                </Modal>
                <button className="saved_movie_delete_btn">Delete</button>
            </div>
        </div>
    ]

    return (
        <>
        {seeDetails ? MovieCardArr[1] : MovieCardArr[0]}
        </>
    )

}