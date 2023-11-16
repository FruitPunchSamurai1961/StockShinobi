import {
    Box,
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    HStack,
    Input,
    InputGroup,
    InputRightElement,
    Link as ChakraLink,
    Stack,
    Text,
    useColorModeValue
} from '@chakra-ui/react'
import {ViewIcon, ViewOffIcon} from '@chakra-ui/icons'
import {Link as ReactRouterLink, useNavigate} from 'react-router-dom'
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {
    setEmailState,
    setFirstNameState,
    setLastNameState,
    setPasswordState,
    setShowPasswordState
} from "../../redux/signup/signupSlice";
import {useSignupMutation} from "../../redux/api/authApi";
import {toast} from "../../index";

const Signup = () => {
    const signupState = useAppSelector((state) => state.signup);
    const dispatch = useAppDispatch();
    const [signup, {isLoading}] = useSignupMutation();
    const navigate = useNavigate();

    const handleSubmit = (event: any) => {
        event.preventDefault();
        signup({
            name: `${signupState.firstName} ${signupState.lastName}`,
            email: signupState.email,
            password: signupState.password
        })
            .unwrap()
            .then(() => {
                navigate("/login")
                toast({
                    status: "success",
                    description: "Account Successfully Created. Please login.",
                    isClosable: true,
                    duration: 5000
                })
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
                    <Heading fontSize={'4xl'} textAlign={'center'}>
                        Sign up
                    </Heading>
                </Stack>
                <Box
                    rounded={'lg'}
                    bg={useColorModeValue('white', 'gray.700')}
                    boxShadow={'lg'}
                    p={8}>
                    <form onSubmit={handleSubmit}>
                        <Stack spacing={4}>
                            <HStack>
                                <Box>
                                    <FormControl id="firstName" isRequired>
                                        <FormLabel>First Name</FormLabel>
                                        <Input type="text" value={signupState.firstName}
                                               onChange={(e) => dispatch(setFirstNameState({newFirstNameValue: e.target.value}))}/>
                                    </FormControl>
                                </Box>
                                <Box>
                                    <FormControl id="lastName">
                                        <FormLabel>Last Name</FormLabel>
                                        <Input type="text" value={signupState.lastName}
                                               onChange={(e) => dispatch(setLastNameState({newLastNameValue: e.target.value}))}/>
                                    </FormControl>
                                </Box>
                            </HStack>
                            <FormControl id="email" isRequired>
                                <FormLabel>Email address</FormLabel>
                                <Input type="email" value={signupState.email}
                                       onChange={(e) => dispatch(setEmailState({newEmailValue: e.target.value}))}/>
                            </FormControl>
                            <FormControl id="password" isRequired>
                                <FormLabel>Password</FormLabel>
                                <InputGroup>
                                    <Input type={signupState.showPassword ? 'text' : 'password'}
                                           value={signupState.password}
                                           onChange={(e) => dispatch(setPasswordState({newPasswordValue: e.target.value}))}/>
                                    <InputRightElement h={'full'}>
                                        <Button
                                            variant={'ghost'}
                                            onClick={() => dispatch(setShowPasswordState({showPassword: !signupState.showPassword}))}>
                                            {signupState.showPassword ? <ViewIcon/> : <ViewOffIcon/>}
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>
                            </FormControl>
                            <Stack spacing={10} pt={2}>
                                <Button
                                    loadingText="Submitting"
                                    size="lg"
                                    bg={'blue.400'}
                                    color={'white'}
                                    _hover={{
                                        bg: 'blue.500',
                                    }}
                                    isLoading={isLoading}
                                    type="submit"
                                >
                                    Sign up
                                </Button>
                            </Stack>
                            <Stack pt={6}>
                                <Text align={'center'}>
                                    Already a user? <ChakraLink as={ReactRouterLink} color={'blue.400'}
                                                                to={"/login"}>Login</ChakraLink>
                                </Text>
                            </Stack>
                        </Stack>
                    </form>
                </Box>
            </Stack>
        </Flex>
    )
}

export default Signup;