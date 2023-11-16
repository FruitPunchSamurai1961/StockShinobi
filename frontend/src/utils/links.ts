import Login from "../views/Login/Login";
import Signup from "../views/Signup/Signup";
import Home from "../views/Home/Home";
import {LinkData} from "../ts/types";

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
    },
    {
        name: "Home",
        path: "/home",
        component: Home
    }
]

export default LinksData;