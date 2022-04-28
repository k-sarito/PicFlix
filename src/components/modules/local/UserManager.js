const localURL = 'http://localhost:8088'

export const getAllUsers = () => {
    return fetch (`${localURL}/users`)
    .then(response => response.json())
}