import React, { useState } from "react";
import { getCommentsByShowId , postTVComment} from "../modules/local/CommentManager";
import { TVCommentCard } from "../comments/TVCommentCard";
import { editShowComment } from "../modules/local/CommentManager";
import { deleteShowComment } from "../modules/local/CommentManager";
import { Modal } from "../modal/Modal";



export const GroupWatchTVCard = ({TVObj, getLoggedInUser}) => {
    const imgURL = `https://image.tmdb.org/t/p/w200${TVObj?.img}`
    const [seeDetails, updateSeeDetails] = useState(false)
    const [TVComments, setTVComments] = useState([])
    const [currentComment, setCurrentComment] = useState({
        body: ""
    })
    const [show, setShow] = useState(false)
    const currentUser = getLoggedInUser()

    const getComments = (showId) => {
        setShow(true)
        return getCommentsByShowId(showId)
        .then(comments => (setTVComments(comments)))
    }

    const handleInput = (event) => {
        const currentInput = {...currentComment}
        currentInput[event.target.id] = event.target.value
        setCurrentComment(currentInput)
    }

    const handlePostTVComment = () => {
        const selection = {...currentComment}
        const today = new Date()
        let newComment = {
            usersId: currentUser,
            savedTVId: TVObj.id,
            body: `${selection.body}`,
            timestamp: today
        }

        postTVComment(newComment).then(setShow(false))
    }

    const handleEditComment = (commentObj) => {
        editShowComment(commentObj)
        .then(() => {
            getCommentsByShowId(commentObj.movieId)
            .then(comments => {
                setShow(false)
                setTVComments(comments)})
        })
    }

    const handleDeleteTVComment = (commentObj) => {
        deleteShowComment(commentObj.id)
        .then(() => {
            getCommentsByShowId(commentObj.movieId)
            .then(comments => {
                setShow(false)
                setTVComments(comments)})
        })
    }

    const TVCardArr = [
    <div className="movie_card">
        <div className="movie_card_content">
            <h4><span className="movie_name">{TVObj?.name}</span></h4>
            <h5><span className="user_name">Suggested By: {TVObj?.users.name}</span></h5>
            <img src={imgURL}/>
            <input
                type='hidden'
                value={TVObj?.tvId}
                id='movieId'
            ></input>
        </div>
        <div className="saved_movie_btn_container">
            <button className="saved_movie_details_btn" onClick={()=> updateSeeDetails(true)} id={`details_btn_${TVObj.tvId}`}>Details</button>
            <button onClick={() => getComments(TVObj.id)}>Comments</button>
                <Modal onClose={() => setShow(false)} show={show} name={TVObj.name} textId="body" handleInput={handleInput} onSubmit={() => handlePostTVComment()} >
                    {TVComments.map((comment) => (<TVCommentCard commentObj={comment} key={comment.id} handleEditComment={handleEditComment} handleDeleteTVComment={handleDeleteTVComment} getLoggedInUser={getLoggedInUser}/> ))}
                </Modal>
            {/* <button className="saved_movie_delete_btn">Delete</button> */}
        </div>
    </div>
    ,
    <div className="movie_card">
        <div className="movie_card_content">
            <h4><span className="movie_name">{TVObj?.name}</span></h4>
            <h5><span className="user_name">Suggested By: {TVObj?.users.name}</span></h5>
            <img src={imgURL}/>
            <input
                type='hidden'
                value={TVObj?.tvId}
                id='movieId'
            ></input>
        </div>
        <div className="movie_card_details">
            <p>Overview: {TVObj.overview}</p>
            <p>Seasons: {TVObj.seasons}</p>
            <p>Episodes: {TVObj.episodes}</p>
            <p>Rating: {TVObj.rating}</p>
        </div>
        <div className="saved_movie_btn_container">
            <button className="saved_movie_details_btn" onClick={()=> updateSeeDetails(false)} id={`details_btn_${TVObj.tvId}`}>Details</button>
            <button onClick={() => getComments(TVObj.id)}>Comments</button>
                <Modal onClose={() => setShow(false)} show={show} name={TVObj.name} textId="body" handleInput={handleInput} onSubmit={() => handlePostTVComment()} >
                    {TVComments.map((comment) => (<TVCommentCard commentObj={comment} key={comment.id} handleEditComment={handleEditComment} handleDeleteTVComment={handleDeleteTVComment} getLoggedInUser={getLoggedInUser}/> ))}
                </Modal>
            {/* <button className="saved_movie_delete_btn">Delete</button> */}
        </div>
    </div>

    ]


    return (
        seeDetails ? TVCardArr[1] : TVCardArr[0]
    )

}