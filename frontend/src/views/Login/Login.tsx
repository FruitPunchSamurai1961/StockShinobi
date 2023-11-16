import {Box, Button, Flex, FormControl, FormLabel, Heading, Input, Stack, useColorModeValue,} from '@chakra-ui/react'
import {useLoginMutation} from "../../redux/api/authApi";
import {useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {setEmailState, setPasswordState} from "../../redux/login/loginSlice";

const Login = () => {
    const [login, {isLoading}] = useLoginMutation();
    const navigate = useNavigate();
    const loginState = useAppSelector((state) => state.login);
    const dispatch = useAppDispatch();

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        login({
            email: loginState.email,
            password: loginState.password
        }).unwrap()
            .then(() => navigate("/home"))
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
                    <Stack spacing={4}>
                        <form onSubmit={handleSubmit}>
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
                        </form>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    )
}

export default Login;