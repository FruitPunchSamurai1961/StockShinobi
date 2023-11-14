import {createSlice} from '@reduxjs/toolkit'

// Define a type for the slice state
interface SignupState {
    showPassword: boolean
}

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