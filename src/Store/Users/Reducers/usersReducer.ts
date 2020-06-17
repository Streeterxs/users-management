import { userActionTypes } from "../Actions/userActionTypes";
import { Usuario } from "../User";
import { UserActions } from "../Actions/userActions";
import { Endereco } from "../Address";

type UserReducerState = {
    userList: Usuario[] | undefined;
    filteredUserList: Usuario[] | undefined;
    userEdit: Usuario | undefined;
}

const INITIAL_STATE: UserReducerState = {
    userList: undefined,
    filteredUserList: undefined,
    userEdit: undefined
};

export function usersReducer(state: UserReducerState = INITIAL_STATE, action: UserActions) {
    let index: number;
    let findedUser;
    switch (action.type) {
        case userActionTypes.USER_CREATION:
            
            return {
                ...state,
                userList: [action.user].concat(state.userList ? state.userList : []) as Usuario[],
                filteredUserList: [action.user].concat(state.userList ? state.userList : []) as Usuario[]
            };

        case userActionTypes.USER_UPDATE:
            index = state.userList ? state.userList.findIndex(user => user.id === action.user?.id) : -1;

            if (index >= 0 && !!state.userList && !!action.user) {
                const userListCopy = state.userList;
                userListCopy[index] = action.user;

                return {
                    ...state,
                    userList: userListCopy,
                    filteredUserList: userListCopy,
                    userEdit: action.user
                };
            }
            
            return {
                ...state
            };

        case userActionTypes.GET_USERS:
            return {
                ...state,
                userList: action.users as Usuario[],
                filteredUserList: action.users as Usuario[]
            };
        

        case userActionTypes.GET_USER:
            index = state.userList ? state.userList.findIndex(user => user.id === action.userId) : -1;

            console.log('index: ', index);

            if (index >= 0 && state.userList) {
                findedUser =  state.userList[index];
                console.log('findedUser: ', findedUser);
                return {
                    ...state,
                    userEdit: findedUser
                };
            }
            
            return {
                ...state
            }

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
