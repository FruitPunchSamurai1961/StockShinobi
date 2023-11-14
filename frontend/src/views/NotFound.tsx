import {Link as ReactRouterLink} from "react-router-dom";
import {Link as ChakraLink} from "@chakra-ui/react";
import {ReactElement} from "react";

const NotFound: () => ReactElement = () => {
    return (
        <div>
            <h2>Nothing to see here!</h2>
            <p>
                <ChakraLink as={ReactRouterLink} to="/login" color={'blue.400'}>Go to the login page</ChakraLink>
            </p>
        </div>
    );
};

export default NotFound;