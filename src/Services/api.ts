import { Usuario } from "../Store/Users/User"
import { config } from "../config";

export const postUser = (user: Usuario) => {
    console.log('user: ', JSON.stringify(user));
    return fetch(`${config.API_URL}/usuarios`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    }).then(response => {
        if (response.ok) {
            return response.json()
        }
    })
};

export const getUsers = (searchNameString?: string) => {
    const search = `${searchNameString ? '?q='+searchNameString : ''}`;

    const url = `${config.API_URL}/usuarios${search}`;
    return fetch(url, {
        method: 'GET',
    }).then(response => {
        if (response.ok) {
            return response.json()
        }
    })
};