import { Usuario } from "../User";
import { userActionTypes } from "./userActionTypes";
import { postUser } from "../../../Services/api";

export type UserActions = {
    type: userActionTypes,
    user?: Usuario
};

export function create(user: Usuario) {

    return {
        type: userActionTypes.USER_CREATION,
        user
    }
}