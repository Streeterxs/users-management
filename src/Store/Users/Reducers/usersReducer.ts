import { userActionTypes } from "../Actions/userActionTypes";
import { Usuario } from "../User";
import { UserActions } from "../Actions/userActions";
import { Endereco } from "../Address";

type UserReducerState = {
    userList: Usuario[] | null,
    filteredUserList: Usuario[] | null
    userEdit?: Usuario,
}

const INITIAL_STATE: UserReducerState = {
    userList: null,
    filteredUserList: null
};

export function usersReducer(state: UserReducerState = INITIAL_STATE, action: UserActions) {
    switch (action.type) {
        case userActionTypes.USER_CREATION:
            
            return {
                ...state,
                userList: [action.user].concat(state.userList ? state.userList : []) as Usuario[],
                filteredUserList: [action.user].concat(state.userList ? state.userList : []) as Usuario[]
            };

        case userActionTypes.GET_USERS:
            return {
                ...state,
                userList: action.users as Usuario[],
                filteredUserList: action.users as Usuario[]
            };

        case userActionTypes.SEARCH_USERS:
            return {
                ...state,
                filteredUserList: action.users as Usuario[]
            };
        

        case userActionTypes.OPTMISTIC_SEARCH_USERS:
            const userKeysHandler = (user: Usuario) => {
                return Object.keys(user) as (keyof Usuario)[]
            };

            const addressKeysHandler = (user: Usuario) => {
                return Object.keys(user.endereco) as (keyof Endereco)[]
            };

            const handleUserKeysIncludesText = (user: Usuario) => {
                return userKeysHandler(user).filter(key => (typeof user[key] !== 'object') || key !== 'id').reduce((acc, curr) => {
                    return acc || (`${user[curr]}`).includes(action.textFullSearch as string)
                }, false);
            };

            const handleUserAddressKeysIncludesText = (user: Usuario) => {
                return addressKeysHandler(user).filter(key => (typeof user.endereco[key] !== 'object')).reduce((acc, curr) => {
                    return acc || (`${user.endereco[curr]}`).includes(action.textFullSearch as string)
                }, false);
            }

            const filteredList = state.userList?.filter(user => {
                return handleUserKeysIncludesText(user) || handleUserAddressKeysIncludesText(user)
            });

            return {
                ...state,
                filteredUserList: filteredList ? filteredList : []
            }
    
        default:
            return state;
    }
}
