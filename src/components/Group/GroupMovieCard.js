import React, {useEffect, useState} from "react";
import { getCommentsByMovieId, postComment } from "../modules/local/CommentManager";
import { CommentCard } from "../comments/CommentCard";
import { editMovieComment } from "../modules/local/CommentManager";
import { deleteMovieComment } from "../modules/local/CommentManager";
import { Modal } from "../modal/Modal";

export const GroupSavedMovieCard = ({movieObj, getLoggedInUser}) => {
    const imgURL = `https://image.tmdb.org/t/p/w200${movieObj?.img}`
    const [seeDetails, updateSeeDetails] = useState(false)
    const [movieComments, setMovieComments] = useState([])
    const [currentComment, setCurrentComment] = useState({
        body: ""
    })
    const [show, setShow] = useState(false)
    const currentUser = getLoggedInUser()
    
    //*----------------------COMMENTS--------------------------------

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

    const handleEditComment = (commentObj) => {
        editMovieComment(commentObj)
        .then(() => {
            getCommentsByMovieId(commentObj.movieId)
            .then(comments => {
                setShow(false)
                setMovieComments(comments)})
        })
    }

    const handleDeleteComment = (commentObj) => {
        deleteMovieComment(commentObj.id)
        .then(() => {
            getCommentsByMovieId(commentObj.movieId)
            .then(comments => {
                setShow(false)
                setMovieComments(comments)})
        })

    }

    const MovieCardArr = [
        <div className="movie_card">
            <div className="movie_card_content">
                <div className="gw_movie_card_header">
                    <h4><span className="movie_name">{movieObj?.name}</span></h4>
                    <h5><span className="user_name">Saved By: {movieObj?.users.name}</span></h5>

                </div>
                <img src={imgURL}/>
                
                <input
                    type='hidden'
                    value={movieObj?.movieId}
                    id='movieId'
                ></input>
            <div className="saved_movie_btn_container">
                <button className="saved_movie_details_btn" onClick={() => updateSeeDetails(true)} id={`details_btn_${movieObj.movieId}`}>Details</button>
                <button onClick={() => getComments(movieObj.id)}>Comments</button>
                <Modal onClose={() => setShow(false)} show={show} name={movieObj.name} textId="body" handleInput={handleInput} onSubmit={() => handlePostComment()} >
                    {movieComments.map((comment) => (<CommentCard commentObj={comment} key={comment.id} getLoggedInUser={getLoggedInUser} handleDeleteComment={handleDeleteComment} handleEditComment={handleEditComment}/>))}
                </Modal>
            </div>
            </div>
        </div>
        ,
        <div className="movie_card_clicked">
            <div className="movie_card_content">
                <h4><span className="movie_name">{movieObj?.name}</span></h4>
                <img src={imgURL}/>
                
                <input
                    type='hidden'
                    value={movieObj?.movieId}
                    id='movieId'
                ></input>
            <div className="saved_movie_btn_container">
                <button className="saved_movie_details_btn" onClick={() => updateSeeDetails(false)} id={`details_btn_${movieObj.movieId}`}>Close</button>
                <button onClick={() => getComments(movieObj.id)}>Comments</button>
                <Modal onClose={() => setShow(false)} show={show} name={movieObj.name} textId="body" handleInput={handleInput} onSubmit={() => handlePostComment()} >
                    {movieComments.map((comment) => (<CommentCard commentObj={comment} key={comment.id} getLoggedInUser={getLoggedInUser} handleDeleteComment={handleDeleteComment} handleEditComment={handleEditComment}/>))}
                </Modal>
            </div>
            </div>
            <aside className="movie_card_details">
                <p>Overview: {movieObj.overview}</p>
                <p>Release: {movieObj.release}</p>
                <p>Runtime: {movieObj.runtime}min</p>
                <p>Rating: {movieObj.rating}</p>
            </aside>
        </div>
    ]

    return (
        seeDetails ? MovieCardArr[1] : MovieCardArr[0]
    )
}