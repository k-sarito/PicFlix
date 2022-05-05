
//TODO This function is checking for an incoming media type. This isn't always a key included in the "results" array returned from the fetch call, so if it doesn't exist the code is to assume it's a movie. If "media_type" does exist, it's probably a show, so we give it the HandleSaveTV save button.

import { useState } from "react"

export const ButtonSort = ({movieObj, HandleSaveTV, HandleSaveFlic}) => {
    const [isDisabled, setIsDisabled] = useState(false)
    if(movieObj?.media_type === "tv"){
        const movieBtnArr = [
            <button type="button" id={movieObj?.id} onClick={HandleSaveTV} className="save_movie_btn">Save</button>
            ,
            <button type="button" disabled id={movieObj?.id} onClick={HandleSaveTV} className="save_movie_btn_disabled">Save</button>
        ]
        return <button type="button" id={movieObj?.id} onClick={HandleSaveTV} className="save_movie_btn">Save</button>
    } else {
        return <button type="button" id={movieObj?.id} className="save_movie_btn" onClick={HandleSaveFlic}>Save</button>
    }
}