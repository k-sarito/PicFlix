import React from "react";
import "./Modal.css"

export const Modal = props => {
    //* MODAL 1. Handles display via the show state in SavedMovieCard
    if (!props.show) {
        return null
    }
    return (
        // * MODAL 2. Allows any click outside the content to close the Modal
        <div className="modal" onClick={props.onClose}>
            {/* //* MODAL 3. Prevents closing when clicking inside content.  */}
            <div className="modal_content" onClick={e => e.stopPropagation()}>
                <div className="modal_header">
                    <h4 className="modal_title">{props.name} Comments</h4>
                </div>
                <div className="modal_body">
                    {/* //* MODAL 4. Allows the body to display anything passed as a child element in SavedMovieCard or elsewhere */}
                    {props.children}
                </div>
                <div className="modal_input">
                    {/* //* MODAL 5. A text input using the passed handleInput function to update the currentComment state */}
                    <input type="text" id={props.textId} onChange={props.handleInput}></input>
                </div>
                <div className="modal_footer">
                    <button onClick={props.onClose} className="button">Close</button>
                    <button onClick={props.onSubmit} className="button">Submit</button>
                </div>
                
            </div>
        </div>

    )
}