export const ButtonSort = ({movieObj, HandleSaveTV, HandleSaveFlic}) => {
    if(movieObj?.media_type === "tv"){
        return <button type="button" id={movieObj?.id} onClick={HandleSaveTV}>Save</button>
    } else {
        return <button type="button" id={movieObj?.id} onClick={HandleSaveFlic}>Save</button>
    }
}