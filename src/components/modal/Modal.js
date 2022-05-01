import React from "react";
import "./Modal.css"

export const Modal = props => {
    if (!props.show) {
        return null
    }
    return (
        <div className="modal" onClick={props.onClose}>
            <div className="modal_content" onClick={e => e.stopPropagation()}>
                <div className="modal_header">
                    <h4 className="modal_title">{props.name} Comments</h4>
                </div>
                <div className="modal_body">
                    {props.children}
                </div>
                <div className="modal_input">
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