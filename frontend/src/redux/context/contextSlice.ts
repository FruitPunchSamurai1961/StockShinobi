import {ContextState} from "../../ts/interfaces";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";


const initialState: ContextState = {
    token: "",
    isLoggedIn: false
}

export const contextSlice = createSlice({
    name: "context",
    initialState: initialState,
    reducers: {
        setIsLoggedInState: (
            state,
            {payload: {newIsLoggedInValue}}: PayloadAction<{ newIsLoggedInValue: boolean }>
        ) => {
            state.isLoggedIn = newIsLoggedInValue;
        },
        setTokenState: (
            state,
            {payload: {newTokenValue}}: PayloadAction<{ newTokenValue: string }>
        ) => {
            state.token = newTokenValue;
        },
    }
});

export const {setIsLoggedInState, setTokenState} = contextSlice.actions;

export const contextReducer = contextSlice.reducer;