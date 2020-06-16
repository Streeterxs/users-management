import { userActionTypes } from "../Actions/userActionTypes";
import { Usuario } from "../User";
import { UserActions } from "../Actions/userActions";

type UserReducerState = {
    userList: Usuario[],
    userEdit?: Usuario
    
}

const INITIAL_STATE: UserReducerState = {
    userList: []
};

export function usersReducer(state = INITIAL_STATE, action: UserActions) {
    switch (action.type) {
        case userActionTypes.USER_CREATION:
            
            return {
                userList: [action.user].concat(state.userList)
            };
    
        default:
            return state;
    }
}
