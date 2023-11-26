import {ContextState} from "../../ts/interfaces";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";


const initialState: ContextState = {
    token: "",
    isLoggedIn: false,
    isLoading: true
}

export const contextSlice = createSlice({
    name: "context",
    initialState: initialState,
    reducers: {
        logout: (state) => {
            state.token = "";
            state.isLoggedIn = false
        },
        setIsLoadingState: (
            state,
            {payload: {newIsLoadingValue}}: PayloadAction<{ newIsLoadingValue: boolean }>
        ) => {
            state.isLoading = newIsLoadingValue;
        },
        login: (
            state,
            {payload: {newTokenValue}}: PayloadAction<{ newTokenValue: string }>
        ) => {
            state.token = newTokenValue;
            state.isLoggedIn = true;
        },
    }
});

export const {logout, login, setIsLoadingState} = contextSlice.actions;

export const contextReducer = contextSlice.reducer;