import React, {useContext} from "react";
import {AuthContext} from "../context/AuthContext";
import {Navigate, Outlet} from "react-router-dom";

const ProtectedRoute = () => {
    const {contextState} = useContext(AuthContext);
    if (contextState.isLoading) {
        return <></>
    } else if (contextState.isLoggedIn) {
        return <Outlet/>
    } else {
        return <Navigate to={"/login"} replace/>
    }

}

export default ProtectedRoute;