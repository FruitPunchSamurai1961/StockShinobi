import {store} from "../redux/store";
import {ReactElement} from "react";
import {ToastPosition} from "@chakra-ui/react";

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type ToastStatusOptions =  "info" | "warning" | "success" | "error" | "loading" | undefined;


export type User = {
    Id: number,
    Name: string,
    Email: string,
    CreatedAt: Date
}

export type AuthenticationToken = {
    token: string,
    expiry: Date
}

export type LinkData = {
    name: String;
    path: String;
    component: () => ReactElement;
}