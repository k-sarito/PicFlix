import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css"


export const NavBar = ({clearUser}) => {
    return (
        <nav>
            <div class="container">
                <div class="row">
                     <div class="col-md-12 text-center">
                         <h3 class="animate-charcter"> PICFLIX</h3>
                    </div>
                </div>
            </div>
            <ul>
                <li>
                    <Link className="nav_link" to="/"><span>Home</span></Link>
                </li>
                <li>
                    <Link className="nav_link" to="/MyFlix"><span>MyFlix</span></Link>
                </li>
                <li>
                    <Link className="nav_link" to="/Group"><span>Group</span></Link>
                </li>
                <li>
                    <Link className="nav_link" to="/GroupWatch"><span>Group Watch</span></Link>
                </li>
                
            </ul>
            <div className="logout_container">
                <div className="box-2">
                    <div className="btn btn-two">
                        <span onClick={clearUser}>Log Out</span>
                    </div>
                </div>
            </div>
        </nav>
    )
}