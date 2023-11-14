import {configureStore} from "@reduxjs/toolkit";
import {signupReducer} from "./signup/signupSlice";

export const store = configureStore({
    reducer: {
        signup: signupReducer
    }
});


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch