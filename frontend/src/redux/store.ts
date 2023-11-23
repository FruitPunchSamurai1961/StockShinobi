import {configureStore} from "@reduxjs/toolkit";
import {signupReducer} from "./signup/signupSlice";
import {userReducer} from "./user/userSlice";
import {authApi} from "./api/authApi";
import {loginReducer} from "./login/loginSlice";
import {rtkQueryErrorLogger} from "./middleware";
import {contextReducer} from "./context/contextSlice";

export const store = configureStore({
    reducer: {
        signup: signupReducer,
        login: loginReducer,
        user: userReducer,
        context: contextReducer,
        [authApi.reducerPath]: authApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(authApi.middleware)
            .concat(rtkQueryErrorLogger)
});