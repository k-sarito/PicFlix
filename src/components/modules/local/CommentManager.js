const localURL = 'http://localhost:8088'

export const getCommentsByMovieId = (movieId) => {
    return fetch (`${localURL}/comments?&savedFlixId=${movieId}&_expand=users`)
    .then(response => response.json())
}

export const postComment = (commentObj) => {
    return fetch (`${localURL}/comments`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(commentObj)
    }).then(response => response.json())
}