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

const Login = () => {
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
                    <form onSubmit={handleSubmit}>
                        <Stack spacing={4}>
                            <FormControl id="email">
                                <FormLabel>Email address</FormLabel>
                                <Input type="email" value={loginState.email}
                                       onChange={(e) => dispatch(setEmailState({newEmailValue: e.target.value}))}/>
                            </FormControl>
                            <FormControl id="password">
                                <FormLabel>Password</FormLabel>
                                <Input type="password" value={loginState.password}
                                       onChange={(e) => dispatch(setPasswordState({newPasswordValue: e.target.value}))}/>
                            </FormControl>
                            <Stack spacing={10}>
                                <Stack
                                    direction={{base: 'column', sm: 'row'}}
                                    align={'start'}
                                    justify={'space-between'}>
                                    <Checkbox>Remember me</Checkbox>
                                    <Text color={'blue.400'}><Link to={"/signup"}>New User?</Link></Text>
                                </Stack>
                                <Button
                                    bg={'blue.400'}
                                    color={'white'}
                                    _hover={{
                                        bg: 'blue.500',
                                    }}
                                    isLoading={isLoading}
                                    type='submit'
                                >
                                    Sign in
                                </Button>
                            </Stack>
                        </Stack>
                    </form>
                </Box>
            </Stack>
        </Flex>
    )
}

export default Login;