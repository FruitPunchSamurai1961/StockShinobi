import {
    Box,
    Button,
    Flex,
    IconButton,
    Stack,
    Text,
    useBreakpointValue,
    useColorMode,
    useColorModeValue,
    useDisclosure
} from '@chakra-ui/react'
import {CloseIcon, HamburgerIcon, MoonIcon, SunIcon,} from '@chakra-ui/icons'
import {Link as ReactRouterLink} from "react-router-dom";
import UserStatusNavbarButtons from "./UserStatusNavbarButtons";
import {useState} from "react";

const Navbar = () => {
    const {isOpen, onToggle} = useDisclosure()
    const {colorMode, toggleColorMode} = useColorMode();

    const [hover, setHover] = useState(false);
    const handleHover = () => {
        setHover(true);
    };
    const handleLeave = () => {
        setHover(false);
    };

    return (
        <Box>
            <Flex
                bg={useColorModeValue('white', 'gray.800')}
                color={useColorModeValue('gray.600', 'white')}
                minH={'60px'}
                py={{base: 2}}
                px={{base: 4}}
                borderBottom={1}
                borderStyle={'solid'}
                borderColor={useColorModeValue('gray.200', 'gray.900')}
                align={'center'}>
                <Flex
                    flex={{base: 1, md: 'auto'}}
                    ml={{base: -2}}
                    display={{base: 'flex', md: 'none'}}>
                    <IconButton
                        onClick={onToggle}
                        icon={isOpen ? <CloseIcon w={3} h={3}/> : <HamburgerIcon w={5} h={5}/>}
                        variant={'ghost'}
                        aria-label={'Toggle Navigation'}
                    />
                </Flex>
                <Flex flex={{base: 1}} justify={{base: 'center', md: 'start'}}>
                    <Text
                        textAlign={useBreakpointValue({base: 'center', md: 'left'})}
                        fontFamily={'heading'}
                        color={useColorModeValue(hover ? 'pink.300' :'gray.600', hover ? 'pink.300' :'white')}
                        onMouseEnter={handleHover}
                        onMouseLeave={handleLeave}
                        fontSize="2xl"
                        fontWeight="bold"
                    >
                        <ReactRouterLink to={"/home"}> Stock Shinobi </ReactRouterLink>
                    </Text>
                </Flex>

                <Stack
                    flex={{base: 1, md: 0}}
                    justify={'flex-end'}
                    direction={'row'}
                    spacing={6}>

                    <UserStatusNavbarButtons/>

                    <Button onClick={toggleColorMode}>
                        {colorMode === 'light' ? <MoonIcon/> : <SunIcon/>}
                    </Button>
                </Stack>
            </Flex>
        </Box>
    );
}


export default Navbar;