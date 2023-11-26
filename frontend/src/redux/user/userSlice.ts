import type {PayloadAction} from '@reduxjs/toolkit'
import {createSlice} from '@reduxjs/toolkit'
import {User} from "../../ts/types";
import {UserState} from "../../ts/interfaces";
import {login, signup} from "../api/authApi";

const initialState: UserState = {
    user: undefined,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout: () => initialState,
    },
    extraReducers: (builder) => {
        builder.addMatcher(login.matchFulfilled, (state, {payload: {user}}: PayloadAction<{
            user: User
        }>) => {
            state.user = user;
        });
        builder.addMatcher(signup.matchFulfilled, (state, {payload: {user}}: PayloadAction<{
            user: User
        }>) => {
            state.user = user;
        })
    },
});

export const {logout} = userSlice.actions
export const userReducer = userSlice.reducer;
