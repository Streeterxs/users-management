import { Usuario } from "../User";
import { userActionTypes } from "./userActionTypes";
import { postUser, getUsers } from "../../../Services";

export type UserActions = {
    type: userActionTypes,
    user?: Usuario,
    users?: Usuario[]
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
        type: userActionTypes.GET_USERS,
        users: usersReturn
    }
}