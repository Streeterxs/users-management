import { Usuario } from "../User";
import { userActionTypes } from "./userActionTypes";
import { postUser, getUsers } from "../../../Services";

export type UserActions = {
    type: userActionTypes,
    user?: Usuario,
    users?: Usuario[],
    textFullSearch?: string
};

export async function createUser(user: Usuario) {

    const userReturn = await postUser(user);

    console.log('userReturn: ', userReturn);
    return {
        type: userActionTypes.USER_CREATION,
        user
    }
}

export async function fetchUsers() {

    const usersReturn = await getUsers();
    console.log('usersReturn: ', usersReturn);
    return {
        type: userActionTypes.GET_USERS,
        users: usersReturn
    }
}

export async function fullTextSearchUsers(text: string) {

    const usersReturn = await getUsers(text);

    return {
        type: userActionTypes.SEARCH_USERS,
        users: usersReturn
    }
}

export function optmisticSearch(text: string) {

    console.log('text action: ', typeof text);

    return {
        type: userActionTypes.OPTMISTIC_SEARCH_USERS,
        textFullSearch: text
    }
}