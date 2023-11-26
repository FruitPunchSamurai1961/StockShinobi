import {Outlet} from "react-router-dom";
import Navbar from "../navbars/Navbar";
import {Container} from "@chakra-ui/react";

const Root = () => {
    return (
        <>
            <Navbar/>
            <Container minW='100%' maxW='100%' minH='100%' maxH='100%' >
                <Outlet/>
            </Container>
        </>
    );
}

export default Root;