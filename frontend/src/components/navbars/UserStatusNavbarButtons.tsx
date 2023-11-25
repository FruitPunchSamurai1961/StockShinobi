import {useNavigate} from "react-router-dom";
import {Button} from "@chakra-ui/react";
import React, {useContext} from "react";
import {AuthContext} from "../context/AuthContext";

const UserStatusNavbarButtons = () => {
    const navigate = useNavigate();
    const {contextState, handleLogout} = useContext(AuthContext);
    if (contextState.isLoggedIn) {
        return (
            <Button as={'a'} display={{base: 'none', md: 'inline-flex'}} fontSize={'sm'} fontWeight={600}
                    color={'white'} bg={'pink.400'} _hover={{bg: 'pink.300',}}
                    onClick={() => {
                        handleLogout();
                        navigate("/login");
                    }}>Logout</Button>
        );
    } else {
        return (
            <>
                <Button as={'a'} fontSize={'sm'} fontWeight={400} variant={'link'}
                        onClick={() => navigate("/login")}>Login</Button>

                <Button as={'a'} display={{base: 'none', md: 'inline-flex'}} fontSize={'sm'} fontWeight={600}
                        color={'white'} bg={'pink.400'} _hover={{bg: 'pink.300',}}
                        onClick={() => navigate("/signup")}>Sign Up</Button>
            </>
        );
    }
}

export default UserStatusNavbarButtons;