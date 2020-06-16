import { CoreActions } from "../Actions/CoreActions";
import jwt from 'jsonwebtoken'
import { coreActionsType } from "../Actions/coreActionsTypes";
import { config } from "../../../config";
import { Credentials } from "../credentials";



type CoreReducerState = {
    token: string | null;
    isLogged: boolean;
    
}

const INITIAL_STATE: CoreReducerState = (() => {
    const actualToken = localStorage.getItem('authToken');
    return {
        token:actualToken,
        isLogged: !!actualToken
    }
})();

export function coreReducer(state = INITIAL_STATE, action: CoreActions) {
    switch (action.type) {
        case coreActionsType.LOGIN:
            console.log(config.PRIVATE_KEY);
            const token = jwt.sign(action.credentials as Credentials, config.PRIVATE_KEY as jwt.Secret);
            localStorage.setItem('authToken', token);

            return {
                token,
                isLogged: true
            };

        case coreActionsType.LOGOUT:
            localStorage.removeItem('authToken');

            return {
                token: null,
                isLogged: false
            };
    
        default:
            return state;
    }
}
