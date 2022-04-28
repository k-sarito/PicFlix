import React, { useState, useEffect} from "react";
import { getAllUsers } from "../modules/local/UserManager";
import { getSavedFlixByUser , getSavedTVByUser} from "../modules/local/SavedFlixManager";

export const Group = ({getLoggedInUser}) => {
    const [friends, setFriends] = useState([])
    const [friendsSavedMovies, setFriendsSavedMovies] = useState([])
    const currentUser = getLoggedInUser()

    //*here we're getting every user, now to the useEffect
    const getAllButMe = () => {
        return getAllUsers()
    }

    const getAllFriendsMovies = () => {
        const movieArr = []
        const friendIdArr = []
        //*we're playing with the big bois now. first, making an array of friend's ids
        for (let item of friends){
            friendIdArr.push(item.id)
            // console.log(friendIdArr)
            
                  
        }
        //*this works by some miracle and takes those ids and runs them through getSavedFlix, spits them into movieArr
        friendIdArr.map((singleId) => (getSavedFlixByUser(singleId).then(movies => {
            movieArr.push(movies)
        })))

        // console.log(movieArr)
        //*we're now taking movieArr and moving it into friendsSavedMovies
        setFriendsSavedMovies(movieArr)
        // console.log(friendsSavedMovies)
        
    }

    const displayFriendsMovies = () => {
        for (let i=0; i<friendsSavedMovies.length; i++){
            friendsSavedMovies[i].map((singleMovie) => (console.log(singleMovie.name)) )
        }
    }

    useEffect(() => {
        getAllButMe()
        //*now we're taking every user that isn't the current user and slapping them into "friends"
        .then(allUsers => {
            let friendsArr = []
            for(let item of allUsers){
                if(item.id !== currentUser){
                    friendsArr.push(item)
                }
            } setFriends(friendsArr)
        })        
    }, [])

    useEffect(() => {
        getAllFriendsMovies()
    }, [friends])

    useEffect(()=> {
        displayFriendsMovies()
    }, [friendsSavedMovies])
}