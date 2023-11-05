import Login from "../views/Login/Login";
import {ReactElement} from "react";


type LinkData = {
    name: String;
    path: String;
    component: () => ReactElement;
}

const LinksData: LinkData[] = [
    {
        name: "Login",
        path: "/login",
        component: Login
    }
]

export default LinksData;