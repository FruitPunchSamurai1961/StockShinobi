import {createBrowserRouter} from "react-router-dom";
import Login from "../../views/Login/Login";
import Home from "../../views/Home/Home";
import Signup from "../../views/Signup/Signup";
import ProtectedRoute from "./ProtectedRoute";
import Root from "./Root";
import NotFound from "./NotFound";
import Index from "./Index";

export const router = createBrowserRouter([{
    path: "/",
    element: <Root/>,
    errorElement: <NotFound/>,
    children: [
        {index: true, element: <Index/>},
        {path: "login", element: <Login/>},
        {path: "signup", element: <Signup/>},
        {
            element: <ProtectedRoute/>,
            children: [
                {path: "home", element: <Home/>},
            ]
        }
    ]
}]);