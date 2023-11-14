import Login from "../views/Login/Login";
import {ReactElement} from "react";
import Signup from "../views/Signup/Signup";


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
    },
    {
        name: "Signup",
        path: "/signup",
        component: Signup
    }
]

export default LinksData;