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
    alert('user created action!');

    console.log('userReturn: ', userReturn);
    return {
        type: userActionTypes.USER_CREATION,
        user
    }
}

export async function fetchUsers() {

    const usersReturn = await getUsers();
    alert('users getted action!');

    console.log('usersReturn: ', usersReturn);
    return {
        type: userActionTypes.GET_USERS,
        users: usersReturn
    }
}