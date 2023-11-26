import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {SignupState} from "../../ts/interfaces";

// Define the initial state using that type
const initialState: SignupState = {
    showPassword: false,
    email: "",
    password: "",
    firstName: "",
    lastName: ""
}

export const signupSlice = createSlice({
    name: 'signup',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        setShowPasswordState: (
            state,
            {payload: {showPassword}}: PayloadAction<{ showPassword: boolean }>
        ) => {
            state.showPassword = showPassword;
        },
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
        setFirstNameState: (
            state,
            {payload: {newFirstNameValue}}: PayloadAction<{ newFirstNameValue: string }>
        ) => {
            state.firstName = newFirstNameValue;
        },
        setLastNameState: (
            state,
            {payload: {newLastNameValue}}: PayloadAction<{ newLastNameValue: string }>
        ) => {
            state.lastName = newLastNameValue;
        },
    },
});

export const {setShowPasswordState, setPasswordState, setLastNameState, setFirstNameState, setEmailState} = signupSlice.actions;


export const signupReducer = signupSlice.reducer;