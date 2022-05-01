const localURL = 'http://localhost:8088'


export const saveFlic = (movie) => {
    return fetch (`${localURL}/savedFlix`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(movie),
    }).then(response => response.json())
}

export const deleteMovie = (movieId) => {
    return fetch (`${localURL}/savedFlix/${movieId}`, {
        method: "DELETE"
    }).then(result => result.json())
}

export const saveTV = (tv) => {
    return fetch (`${localURL}/savedTV`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(tv),
    }).then(response => response.json())
}

export const deleteShow = (showId) => {
    return fetch (`${localURL}/savedTV/${showId}`, {
        method: "DELETE"
    }).then(result => result.json())
}

export const getSavedFlixByUser = (userId) => {
    return fetch (`${localURL}/savedFlix?&usersId=${userId}&_expand=users`)
    .then(result => result.json())
}

export const getSavedTVByUser = (userId) => {
    return fetch (`${localURL}/savedTV?&usersId=${userId}&_expand=users`)
    .then(result => result.json())
}

export const getExclusiveFlix = (userId) => {
    return fetch (`${localURL}/savedFlix?&usersId_ne=${userId}&_expand=users`)
    .then(result => result.json())
}

export const getExclusiveTV = (userId) => {
    return fetch (`${localURL}/savedTV?&usersId_ne=${userId}&_expand=users`)
    .then(result => result.json())
}

export const groupWatchTV = (showObj) => {
    return fetch (`${localURL}/savedTV?&id=${showObj.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(showObj)
    }).then(response => response.json())
}