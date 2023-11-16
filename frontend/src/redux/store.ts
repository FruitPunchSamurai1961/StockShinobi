import {configureStore} from "@reduxjs/toolkit";
import {signupReducer} from "./signup/signupSlice";
import {authReducer} from "./auth/authSlice";
import {authApi} from "./api/authApi";
import {loginReducer} from "./login/loginSlice";
import {rtkQueryErrorLogger} from "./middleware";

export const store = configureStore({
    reducer: {
        signup: signupReducer,
        login: loginReducer,
        auth: authReducer,
        [authApi.reducerPath]: authApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(authApi.middleware)
            .concat(rtkQueryErrorLogger)
});