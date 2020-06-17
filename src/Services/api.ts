import { Usuario } from "../Store/Users/User"
import { config } from "../config";

export const postUser = (user: Usuario) => {
    return fetch(`${config.API_URL}/usuarios`, {
        method: 'POST',
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