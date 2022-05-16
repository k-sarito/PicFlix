import React, {useState, useEffect} from "react";

export const CommentCard = ({commentObj, getLoggedInUser, handleEditComment, handleDeleteComment}) => {
    const currentUser = getLoggedInUser()
    const [editView, setEditView] = useState(false)
    const [editedComment, setEditedComment] = useState({
        
    })
    const [editedObj, setEditedObj] = useState({})

    //? Checking if the user viewing the comments has posted any of them. If so, displays an edit and delete button. 

    const ButtonDisplay = () => {
        if(commentObj.users.id === currentUser){
            return (
                <div className="btn_container">
                    <button type="button" onClick={() => displayEditMovieComment()}>Edit</button>
                    <button type="button" onClick={() => handleDeleteComment(commentObj)}>Delete</button>
                </div>
            )
        }
    }

    //*----------------------------------EDIT COMMENT---------------------------------------------------------

    //TODO COMMENT 4. Called at 41. Creates a copy of the incoming object so we can snatch its Id and movieId for the newObj. Takes the body content from editedComment, then pops this new object into the editedObj state at line 6.  

    const prepEditedObj = (Obj) => {
        let commentObjCopy = {...Obj}
        let newObj = {
            id: commentObjCopy.id,
            movieId: commentObjCopy.movieId,
            body: editedComment.body
        }
        setEditedObj(newObj)
    }

    //TODO COMMENT 3. Watches the editedComment state. When it is updated, calls prepEditedObj

    useEffect(() => {
        prepEditedObj(commentObj)
        // console.log(editedObj)
    }, [editedComment])

    //TODO COMMENT 2. Familiar handleInput, watches the input field and onChange updates the editedComment object with the value. 

    const handleInput = (event) => {
        const currentInput = {...editedComment}

        currentInput[event.target.id] = event.target.value

        // console.log(currentInput)

        setEditedComment(currentInput)
    }

    //TODO COMMENT 1. Switches editView to true, editArr[1] is now displayed. Called onClick at line 17. 

    const displayEditMovieComment = () => {
        setEditView(true)
    }

    //*---------------------------------EDIT ARRAY------------------------------------------------------------

    const editArr = [
        <div className="comment_card">
            <div className="comment_name">
                <h5>{commentObj.users.name}</h5>
            </div>
            <p>{commentObj.body}</p>
            {ButtonDisplay()}
        </div>
        ,
        <div className="edit_comment_card">
            <h5>{commentObj.users.name}</h5>
            <input type="text" id="body"  onChange={handleInput} defaultValue={commentObj.body}/>
            <div className="btn_container">
                <button type="button" onClick={() => setEditView(false)}>Cancel</button>
                {/* //TODO COMMENT 5. Patches the comment object in the database with the new object housed in the editedObj state.  */}
                <button type="button" onClick={() => handleEditComment(editedObj)}>Submit</button>

            </div>
        </div>
    ]

    
    return (
        editView ? editArr[1] : editArr[0]
    )
}