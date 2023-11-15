import {createSlice} from '@reduxjs/toolkit'
import {SignupState} from "../../ts/interfaces";

// Define the initial state using that type
const initialState: SignupState = {
    showPassword: false,
}

export const signupSlice = createSlice({
    name: 'showPassword',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        setShowPasswordState: (state, action) => {
            state.showPassword = action.payload.showPassword;
        }
    },
})

export const {setShowPasswordState} = signupSlice.actions;


export const signupReducer = signupSlice.reducer;