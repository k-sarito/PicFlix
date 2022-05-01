import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css"


export const NavBar = ({clearUser}) => {
    return (
        <nav>
            <h1>PicFlix</h1>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/MyFlix">MyFlix</Link>
                </li>
                <li>
                    <Link to="/Group">Group</Link>
                </li>
                <li>
                    <Link to="/GroupWatch">Group Watch</Link>
                </li>
                <li>
                    <button type="button" onClick={clearUser}>Logout</button>
                </li>
            </ul>
        </nav>
    )
}