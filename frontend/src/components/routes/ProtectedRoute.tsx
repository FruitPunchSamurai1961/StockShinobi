import React, {useContext} from "react";
import {AuthContext} from "../context/AuthContext";
import {Navigate, Outlet} from "react-router-dom";

const ProtectedRoute = () => {
    const {contextState} = useContext(AuthContext);
    return contextState.isLoggedIn ? <Outlet/> : <Navigate to={"/login"} replace/>
}

export default ProtectedRoute;