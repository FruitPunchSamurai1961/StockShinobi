import type {PayloadAction} from '@reduxjs/toolkit'
import {createSlice} from '@reduxjs/toolkit'
import {AuthenticationToken, RootState, User} from "../../ts/types";
import {AuthState} from "../../ts/interfaces";
import {login, signup} from "../api/authApi";

const initialState: AuthState = {
    user: undefined,
    authentication_token: undefined
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: () => initialState,
    },
    extraReducers: (builder) => {
        builder.addMatcher(login.matchFulfilled, (state, {payload: {authentication_token, user}}: PayloadAction<{
            authentication_token: AuthenticationToken,
            user: User
        }>) => {
            state.authentication_token = authentication_token;
            state.user = user;
        });
        builder.addMatcher(signup.matchFulfilled, (state, {payload: {user}}: PayloadAction<{
            user: User
        }>) => {
            state.user = user;
        })
    },
});

export const {logout} = authSlice.actions


export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectUserToken = (state: RootState) => state.auth.authentication_token;

export const authReducer = authSlice.reducer;
