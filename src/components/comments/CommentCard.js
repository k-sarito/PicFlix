import React from "react";

export const CommentCard = ({commentObj}) => {
    return (
        <div className="comment_card">
            <h5>{commentObj.users.name}</h5>
            <p>{commentObj.body}</p>
        </div>
    )
}