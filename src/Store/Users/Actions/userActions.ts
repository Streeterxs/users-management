import { Usuario } from "../User";
import { userActionTypes } from "./userActionTypes";
import { postUser } from "../../../Services";

export type UserActions = {
    type: userActionTypes,
    user?: Usuario
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