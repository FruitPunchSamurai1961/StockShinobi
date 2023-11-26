import {
    Box,
    Button,
    Checkbox,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack,
    Text,
    useColorModeValue,
} from '@chakra-ui/react'
import {useLoginMutation} from "../../redux/api/authApi";
import {Link, useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {setEmailState, setPasswordState} from "../../redux/login/loginSlice";
import {AuthContext} from "../../components/context/AuthContext";
import {useContext} from "react";
import SearchBar from "../../components/searchbar/SearchBar";

const Form = () => {
    const [login, {isLoading}] = useLoginMutation();
    const navigate = useNavigate();
    const loginState = useAppSelector((state) => state.login);
    const dispatch = useAppDispatch();
    const {handleLogin} = useContext(AuthContext);


    const handleSubmit = async (event: any) => {
        event.preventDefault();
        login({
            email: loginState.email,
            password: loginState.password
        }).unwrap()
            .then((result) => {
                handleLogin(result.authentication_token.token);
                navigate("/");
            })
            .catch(error => console.error(error));
    }

    return (
        <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}
            bg={useColorModeValue('gray.50', 'gray.800')}>
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                <Stack align={'center'}>
                    <Heading fontSize={'4xl'}>Login</Heading>
                </Stack>
                <Box
                    rounded={'lg'}
                    bg={useColorModeValue('white', 'gray.700')}
                    boxShadow={'lg'}
                    p={8}>
                    <SearchBar />
                </Box>
            </Stack>
        </Flex>
    )
}

export default Form;