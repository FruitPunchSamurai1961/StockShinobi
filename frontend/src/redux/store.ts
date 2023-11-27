import {configureStore} from "@reduxjs/toolkit";
import {signupReducer} from "./signup/signupSlice";
import {userReducer} from "./user/userSlice";
import {authApi} from "./api/authApi";
import {loginReducer} from "./login/loginSlice";
import {rtkQueryErrorLogger} from "./middleware";
import {contextReducer} from "./context/contextSlice";
import {stockApi} from "./api/stockApi";
import {homeReducer} from "./home/homeSlice";

export const store = configureStore({
    reducer: {
        signup: signupReducer,
        login: loginReducer,
        user: userReducer,
        context: contextReducer,
        home: homeReducer,
        [authApi.reducerPath]: authApi.reducer,
        [stockApi.reducerPath]: stockApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(authApi.middleware)
            .concat(stockApi.middleware)
            .concat(rtkQueryErrorLogger)
});