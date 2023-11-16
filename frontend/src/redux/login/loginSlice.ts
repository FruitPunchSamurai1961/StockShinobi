import {LoginState} from "../../ts/interfaces";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";


const initialState: LoginState = {
    email: "",
    password: ""
}

export const loginSlice = createSlice({
    name: "login",
    initialState: initialState,
    reducers: {
        setEmailState: (
            state,
            {payload: {newEmailValue}}: PayloadAction<{ newEmailValue: string }>
        ) => {
            state.email = newEmailValue;
        },
        setPasswordState: (
            state,
            {payload: {newPasswordValue}}: PayloadAction<{ newPasswordValue: string }>
        ) => {
            state.password = newPasswordValue;
        },
    }
})

export const {setEmailState, setPasswordState} = loginSlice.actions;

export const loginReducer = loginSlice.reducer;



