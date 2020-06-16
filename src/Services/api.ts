import { Usuario } from "../Store/Users/User"

export const postUser = (user: Usuario) => {
    return fetch(process.env.REACT_APP_API_URL as string, {
        method: 'POST',
        body: JSON.stringify(user)
    }).then(response => {
        if (response.ok) {
            return response.json()
        }
    })
};