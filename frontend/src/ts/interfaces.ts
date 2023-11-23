import {AuthenticationToken, User} from "./types";

export interface SignupState {
    showPassword: boolean,
    email: string,
    password: string,
    firstName: string,
    lastName: string
}

export interface UserState {
    user: User | undefined
}

export interface LoginState {
    email: string
    password: string
}

export interface ContextState {
    isLoggedIn: boolean
    token: string
}


export interface LoginResponse {
    authentication_token: AuthenticationToken
    user: User
}

export interface SignupResponse {
    user: User
}