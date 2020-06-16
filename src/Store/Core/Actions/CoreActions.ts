import { coreActionsType } from "./coreActionsTypes";
import { Credentials } from "../credentials";

export type CoreActions = {
    type: coreActionsType,
    credentials?: Credentials;
};

export function login(credentials: Credentials) {
    return {
        type: coreActionsType.LOGIN,
        credentials
    }
}

export function logout() {
    return {
        type: coreActionsType.LOGOUT
    }
}