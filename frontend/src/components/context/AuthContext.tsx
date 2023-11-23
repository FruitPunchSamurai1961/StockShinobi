import React, {Context, createContext, useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {
    login as contextSliceLogin,
    logout as contextSliceLogout,
    setIsLoadingState
} from "../../redux/context/contextSlice";
import {AuthContextType} from "../../ts/types";
import {logout as userSliceLogout} from "../../redux/user/userSlice";
import {logout as loginSliceLogout} from "../../redux/login/loginSlice";
import {LOCAL_STORAGE_AUTH_TOKEN_KEY} from "../../utils/authConstants";

const defaultAuthContext: AuthContextType = {
    handleLogin: () => {
    },
    handleLogout: () => {
    },
    contextState: {
        token: "",
        isLoggedIn: false,
        isLoading: true
    }
}

const AuthContext: Context<AuthContextType> = createContext<AuthContextType>(defaultAuthContext);

const AuthProvider = ({children}: { children: React.ReactNode }) => {
    const contextState = useAppSelector((state) => state.context);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const storedAuthToken = localStorage.getItem(LOCAL_STORAGE_AUTH_TOKEN_KEY);
        if (storedAuthToken) {
            dispatch(contextSliceLogin({newTokenValue: storedAuthToken}));
        }
        dispatch(setIsLoadingState({newIsLoadingValue: false}));
    }, [])

    const handleLogin = (token: string) => {
        dispatch(contextSliceLogin({newTokenValue: token}));
        localStorage.setItem(LOCAL_STORAGE_AUTH_TOKEN_KEY, token);
    };

    const handleLogout = () => {
        dispatch(contextSliceLogout());
        dispatch(userSliceLogout());
        dispatch(loginSliceLogout());
        localStorage.removeItem(LOCAL_STORAGE_AUTH_TOKEN_KEY);
    }


    return (
        <AuthContext.Provider
            value={{contextState: contextState, handleLogin: handleLogin, handleLogout: handleLogout}}>
            {children}
        </AuthContext.Provider>);
}

export {AuthContext, AuthProvider}