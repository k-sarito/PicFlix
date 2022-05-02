const localURL = 'http://localhost:8088'

export const getCommentsByMovieId = (movieId) => {
    return fetch (`${localURL}/movieComments?&savedFlixId=${movieId}&_expand=users`)
    .then(response => response.json())
}

export const postComment = (commentObj) => {
    return fetch (`${localURL}/movieComments`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(commentObj)
    }).then(response => response.json())
}

export const editMovieComment = (commentObj) => {
    return fetch (`${localURL}/movieComments/${commentObj.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(commentObj)
    }).then(response => response.json())
}

export const getCommentsByShowId = (showId) => {
    return fetch (`${localURL}/showComments?&savedTVId=${showId}&_expand=users`)
    .then(response => response.json())
}

export const postTVComment = (commentObj) => {
    return fetch (`${localURL}/showComments`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(commentObj)
    }).then(response => response.json())
}

export const editShowComment = (commentObj) => {
    return fetch (`${localURL}/showComments/${commentObj.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(commentObj)
    }).then(response => response.json())
}