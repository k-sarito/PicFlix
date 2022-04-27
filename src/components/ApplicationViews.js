import React from "react";
import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import { Login } from "./auth/Login";
import { Register } from "./auth/Register";
import { MovieList } from "./Home/MovieList";
import { TVList } from "./Home/TVList";
import { MyFlix } from "./SavedFlix/MyFlix";


export const ApplicationViews = ({
    isAuthenticated,
    setAuthUser,
    getLoggedInUser,
  }) => {
    const PrivateOutlet = () => {
      return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
    };

    return (
        <>
            <Routes>
                <Route path="/" element={<PrivateOutlet/>}>
                    <Route path="/" element={<MovieList getLoggedInUser={getLoggedInUser}/>}/>
                    <Route path="/home/tv" element={<TVList getLoggedInUser={getLoggedInUser}/>}/>
                    <Route path="/MyFlix" element={<MyFlix getLoggedInUser={getLoggedInUser}/>}/>
                </Route>
                <Route path="/login" element={<Login setAuthUser={setAuthUser} />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </>
    );
};