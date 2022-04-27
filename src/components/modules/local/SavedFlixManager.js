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