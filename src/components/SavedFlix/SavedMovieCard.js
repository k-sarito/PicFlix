import React, { useEffect, useState } from "react";
import { getMovieStreaming } from "../modules/external/TMDBManager";
import { getCommentsByMovieId , postComment } from "../modules/local/CommentManager";
import { CommentCard } from "../comments/CommentCard";
import { editMovieComment } from "../modules/local/CommentManager";
import { Modal } from "../modal/Modal";
import { groupWatchMovie } from "../modules/local/SavedFlixManager";
import {deleteMovie} from "../modules/local/SavedFlixManager"
import "./SavedCard.css"


export const SavedMovieCard = ({movieObj, getLoggedInUser, handleDeleteMovie}) => {
    const imgURL = `https://image.tmdb.org/t/p/w200${movieObj?.img}`
    const [seeDetails, updateSeeDetails] = useState(false)
    const [movieComments, setMovieComments] = useState([])
    const [currentComment, setCurrentComment] = useState({
        body: ""
    })
    const [groupShow, setGroupShow] = useState(false)
    const [show, setShow] = useState(false)
    const currentUser = getLoggedInUser()
    const [streaming, setStreaming] = useState([])


     //*--------------------COMMENTS--------------------------------------------

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

    //*--------------------GROUP WATCH---------------------------

    const checkIfGroupWatch = (movie) => {
        if(movie.groupWatch === true){
            setGroupShow(true)
        }
    }

    useEffect(() => {
        checkIfGroupWatch(movieObj)
    }, [])

    const handleGroupWatch = (movie) => {
        setGroupShow(true)
        let movieObjCopy = {...movie}
        let editedObj = {
            id: movieObjCopy.id,
            groupWatch: true
        }
        groupWatchMovie(editedObj)
    }

    const undoGroupWatch = (movie) => {
        setGroupShow(false)
        let movieObjCopy = {...movie}
        let editedObj = {
            id: movieObjCopy.id,
            groupWatch: false
        }
        groupWatchMovie(editedObj)
    }

    


    const groupIconArr = [
        <svg width="24" height="24" strokeWidth="1.5" viewBox="0 0 24 24"  fill="none" xmlns="http://www.w3.org/2000/svg" onClick={() => handleGroupWatch(movieObj)}>
            <title>Add to group watch</title>
            <path d="M5 20V19C5 15.134 8.13401 12 12 12V12C15.866 12 19 15.134 19 19V20" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        ,
        <svg width="24" height="24" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={() => undoGroupWatch(movieObj)}>
            <title>Remove from group watch</title>
            <path d="M1 20V19C1 15.134 4.13401 12 8 12V12C11.866 12 15 15.134 15 19V20" stroke="currentColor" strokeLinecap="round"/>
            <path d="M13 14V14C13 11.2386 15.2386 9 18 9V9C20.7614 9 23 11.2386 23 14V14.5" stroke="currentColor" strokeLinecap="round"/>
            <path d="M8 12C10.2091 12 12 10.2091 12 8C12 5.79086 10.2091 4 8 4C5.79086 4 4 5.79086 4 8C4 10.2091 5.79086 12 8 12Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M18 9C19.6569 9 21 7.65685 21 6C21 4.34315 19.6569 3 18 3C16.3431 3 15 4.34315 15 6C15 7.65685 16.3431 9 18 9Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>

    ]

    

    const MovieCardArr = [
        <div className="movie_card">
            <div className="movie_card_content">
            <div className="movie_card_header">
                <h4><span className="movie_name">{movieObj?.name}</span></h4>

                {groupShow ? groupIconArr[1] : groupIconArr[0]}

            </div>

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
                    {movieComments.map((comment) => (<CommentCard commentObj={comment} key={comment.id} getLoggedInUser={getLoggedInUser} handleEditComment={handleEditComment}/>))}
                </Modal>
                <button className="saved_movie_delete_btn" onClick={handleDeleteMovie}>Delete</button>
            </div>
        </div>
        ,
        <div className="movie_card">
            <div className="movie_card_content">
            <div className="movie_card_header">
                <h4><span className="movie_name">{movieObj?.name}</span></h4>

                {groupShow ? groupIconArr[1] : groupIconArr[0]}

            </div>
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
                    {movieComments.map((comment) => (<CommentCard commentObj={comment} key={comment.id} getLoggedInUser={getLoggedInUser}/>))}
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