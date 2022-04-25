import React, {useState} from "react"
import { ApplicationViews } from "./ApplicationViews"
import { NavBar } from "./nav/NavBar"
import "./PicFlix.css"

export const PicFlix = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(sessionStorage.getItem("picflix_user") !== null)

    const setAuthUser = (user) => {
        sessionStorage.setItem("picflix_user", JSON.stringify(user))
        setIsAuthenticated(sessionStorage.getItem("picflix_user") !== null)
    }

    const getLoggedInUser = () => {
      const thisUserId = parseInt(sessionStorage.getItem("picflix_user"))
      return thisUserId;
    }
    
    const clearUser = () => {
        sessionStorage.clear();
        setIsAuthenticated(sessionStorage.getItem("picflix_user") !== null)
      }
    
return (
  <>
  <NavBar clearUser={clearUser} isAuthenticated={isAuthenticated}/>
  <ApplicationViews setAuthUser={setAuthUser}
                isAuthenticated={isAuthenticated}
                setIsAuthenticated={setIsAuthenticated}
                getLoggedInUser={getLoggedInUser}/>
  </>
)}