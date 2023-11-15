import {configureStore} from "@reduxjs/toolkit";
import {signupReducer} from "./signup/signupSlice";

export const store = configureStore({
    reducer: {
        signup: signupReducer
    }
});