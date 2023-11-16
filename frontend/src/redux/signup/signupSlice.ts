import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {SignupState} from "../../ts/interfaces";

// Define the initial state using that type
const initialState: SignupState = {
    showPassword: false,
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
        }
    },
})

export const {setShowPasswordState} = signupSlice.actions;


export const signupReducer = signupSlice.reducer;