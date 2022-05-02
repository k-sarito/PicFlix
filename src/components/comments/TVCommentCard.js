import React, {useState, useEffect} from "react";

export const TVCommentCard = ({commentObj, getLoggedInUser, handleEditComment}) => {
    const currentUser = getLoggedInUser()
    const [editView, setEditView] = useState(false)
    const [editedComment, setEditedComment] = useState({
        
    })
    const [editedObj, setEditedObj] = useState({})

    const ButtonDisplay = () => {
        if(commentObj.users.id === currentUser){
            return (
                <div className="btn_container">
                <button type="button" onClick={() => displayEditMovieComment()}>Edit</button>
                <button type="button">Delete</button>
                </div>
            )
        }
    }

    const prepEditedObj = (Obj) => {
        let commentObjCopy = {...Obj}
        let newObj = {
            id: commentObjCopy.id,
            savedTVId: commentObjCopy.savedTVId,
            body: editedComment.body
        }
        setEditedObj(newObj)
    }

    useEffect(() => {
        prepEditedObj(commentObj)
        // console.log(editedObj)
    }, [editedComment])

    const handleInput = (event) => {
        const currentInput = {...editedComment}

        currentInput[event.target.id] = event.target.value

        // console.log(currentInput)

        setEditedComment(currentInput)
    }

    const displayEditMovieComment = () => {
        setEditView(true)
    }

    const editArr = [
        <div className="comment_card">
            <h5>{commentObj.users.name}</h5>
            <p>{commentObj.body}</p>
            {ButtonDisplay()}
        </div>
        ,
        <div className="edit_comment_card">
            <h5>{commentObj.users.name}</h5>
            <input type="text" id="body"  onChange={handleInput} defaultValue={commentObj.body}/>
            <button type="button" onClick={() => setEditView(false)}>Cancel</button>
            <button type="button" onClick={() => handleEditComment(editedObj)}>Submit</button>
        </div>
    ]

    
    return (
        editView ? editArr[1] : editArr[0]
    )
}