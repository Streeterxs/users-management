import { Usuario } from "../User";
import { userActionTypes } from "./userActionTypes";
import { postUser, getUsers, updateUser } from "../../../Services";

export type UserActions = {
    type: userActionTypes,
    user?: Usuario,
    users?: Usuario[],
    textFullSearch?: string,
    userId?: number
};

export async function createUser(user: Usuario): Promise<UserActions> {

    const userReturn = await postUser(user);
    return {
        type: userActionTypes.USER_CREATION,
        user
    }
}

export async function updateUserAction(user: Usuario): Promise<UserActions> {

    const userReturn = await updateUser(user);
    return {
        type: userActionTypes.USER_UPDATE,
        user: userReturn
    }
}

export function optimisticUpdateUserAction(user: Usuario): UserActions {

    return {
        type: userActionTypes.USER_UPDATE,
        user
    }
}

export async function fetchUsers(): Promise<UserActions> {

    const usersReturn = await getUsers();
    return {
        type: userActionTypes.GET_USERS,
        users: usersReturn
    }
}

export async function fullTextSearchUsers(text: string): Promise<UserActions> {

    const usersReturn = await getUsers(text);

    return {
        type: userActionTypes.SEARCH_USERS,
        users: usersReturn
    }
}

export function optmisticSearch(text: string): UserActions {

    return {
        type: userActionTypes.OPTMISTIC_SEARCH_USERS,
        textFullSearch: text
    }
}

export function findUser(userId: number): UserActions {

    return {
        type: userActionTypes.GET_USER,
        userId
    }
}