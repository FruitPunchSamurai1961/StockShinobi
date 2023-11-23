import {useContext} from "react";
import {AuthContext} from "../context/AuthContext";
import {Navigate} from "react-router-dom";


const Index = () => {
    const {contextState} = useContext(AuthContext);
    if (contextState.isLoggedIn) {
        return <Navigate to={"/home"} replace/>
    } else {
        return <Navigate to={"/login"} replace/>
    }
}

export default Index;