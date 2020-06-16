import { CoreActions } from "../Actions/CoreActions";
import jwt from 'jsonwebtoken'
import { coreActionsType } from "../Actions/coreActionsTypes";
import { config } from "../../../config";
import { Credentials } from "../credentials";



type CoreReducerState = {
    token: string | null;
    isLogged: boolean;
    
}

const INITIAL_STATE: CoreReducerState = {
    token: localStorage.getItem('authToken'),
    get isLogged() {
        return !!this.token;
    }
};

export function coreReducer(state = INITIAL_STATE, action: CoreActions) {
    switch (action.type) {
        case coreActionsType.LOGIN:
            const token = jwt.sign(action.credentials as Credentials, config.PRIVATE_KEY as jwt.Secret);
            localStorage.setItem('authToken', token);

            return {
                ...state,
                token
            };

        case coreActionsType.LOGOUT:
            localStorage.removeItem('authToken');

            return {
                ...state,
                token: null
            };
    
        default:
            return state;
    }
}
