
//TODO This function is checking for an incoming media type. This isn't always a key included in the "results" array returned from the fetch call, so if it doesn't exist the code is to assume it's a movie. If "media_type" does exist, it's probably a show, so we give it the HandleSaveTV save button.

export const ButtonSort = ({movieObj, HandleSaveTV, HandleSaveFlic}) => {
    if(movieObj?.media_type === "tv"){
        return <button type="button" id={movieObj?.id} onClick={HandleSaveTV}>Save</button>
    } else {
        return <button type="button" id={movieObj?.id} onClick={HandleSaveFlic}>Save</button>
    }
}