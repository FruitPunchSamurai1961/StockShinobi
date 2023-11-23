import React, {Context, createContext} from "react";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {setIsLoggedInState, setTokenState} from "../../redux/context/contextSlice";
import {AuthContextType} from "../../ts/types";


const defaultAuthContext: AuthContextType = {
    handleLogin: token => {
    },
    handleLogout: () => {
    },
    contextState: {
        token: "",
        isLoggedIn: false
    }
}

const AuthContext: Context<AuthContextType> = createContext<AuthContextType>(defaultAuthContext);

const AuthProvider = ({children}: { children: React.ReactNode }) => {
    const contextState = useAppSelector((state) => state.context);
    const dispatch = useAppDispatch();

    const handleLogin = (token: string) => {
        dispatch(setIsLoggedInState({newIsLoggedInValue: true}));
        dispatch(setTokenState({newTokenValue: token}));
    };

    const handleLogout = () => {
        dispatch(setIsLoggedInState({newIsLoggedInValue: false}));
        dispatch(setTokenState({newTokenValue: ""}));
    }


    return (
        <AuthContext.Provider
            value={{contextState: contextState, handleLogin: handleLogin, handleLogout: handleLogout}}>
            {children}
        </AuthContext.Provider>);
}

export {AuthContext, AuthProvider}