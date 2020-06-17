import { userActionTypes } from "../Actions/userActionTypes";
import { Usuario } from "../User";
import { UserActions } from "../Actions/userActions";

type UserReducerState = {
    userList: Usuario[] | null,
    userEdit?: Usuario
}

const INITIAL_STATE: UserReducerState = {
    userList: null
};

export function usersReducer(state = INITIAL_STATE, action: UserActions) {
    switch (action.type) {
        case userActionTypes.USER_CREATION:
            
            return {
                userList: [action.user].concat(state.userList ? state.userList : []) as Usuario[]
            };

        case userActionTypes.GET_USERS:
            return {
                ...state,
                userList: action.users as Usuario[]
            };
    
        default:
            return state;
    }
}
