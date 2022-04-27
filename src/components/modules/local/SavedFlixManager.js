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

export const saveTV = (tv) => {
    return fetch (`${localURL}/savedTV`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(tv),
    }).then(response => response.json())
}

export const getSavedFlixByUser = (userId) => {
    return fetch (`${localURL}/savedFlix?_userId=${userId}`)
    .then(result => result.json())
}

export const getSavedTVByUser = (userId) => {
    return fetch (`${localURL}/savedTV?_userId=${userId}`)
    .then(result => result.json())
}