import { Button, Flex, FormControl, FormHelperText, FormLabel, Heading, HStack, Input, InputGroup, InputLeftAddon, InputRightElement, Radio, RadioGroup, Text, useToast } from '@chakra-ui/react'
import axios from 'axios';
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { FiChevronsRight } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { errToast, successToast } from '../Components/Toast';
import { userAtom } from '../state/atom';
import { baseURL, getUserByMail, login, signup } from '../utils/connection';

type loginDataType = {
    email: string;
    password: string;
}

type signupDataType = {
    name: string;
    email: string;
    contact: string;
    role: string;
    password: string;
}

interface LoginProps {
    setIsLogin: Dispatch<SetStateAction<boolean>>
}

interface SignUpProps {
    setIsLogin: Dispatch<SetStateAction<boolean>>
}

const validateEmailNdPassword = (email: string, password: string, toast: any) => {
    if (email === '') {
        errToast(toast, 'Field Missing.', 'Please fill email to continue further')
        return false
    }
    if (password === '') {
        errToast(toast, 'Field Missing.', 'Please fill password to continue')
        return false
    }
    if (!email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )) {
        errToast(toast, 'Invalid email address.', 'Please fill a valid email address.')
        return false
    }
    const domain = email.split('@')
    const validDomain = ['kongu.edu', 'kongu.ac.in']
    if (!validDomain.includes(domain[1])) {
        errToast(toast, 'Invalid domain.', 'Please fill a valid domain.')
        return false
    }
    return true
}

const Login = ({ setIsLogin }: LoginProps) => {
    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)

    const toast = useToast();
    const navigate = useNavigate()
    const setUserState = useSetRecoilState(userAtom)

    const [loginData, setLoginData] = useState<loginDataType>({
        email: '',
        password: '',
    })

    const loginConnection = async () => {
        const isValid = validateEmailNdPassword(loginData.email, loginData.password, toast);
        if (!isValid) {
            return
        }
        const response = await axios.post(baseURL + login, loginData)
        if (response.data.desc === 'no user found') {
            errToast(toast, 'No user found.', 'Please Signup before Login')
            return
        }
        if (response.data.desc === 'invalid password') {
            errToast(toast, 'Invalid password.', 'Please fill a valid password.')
            return
        }
        if (response.data.status) {
            successToast(toast, 'Success', 'You have successfully authenticated')
            localStorage.setItem('email', response.data.data.email)
            setUserState(response.data.data);
            navigate('/')
        } else {
            errToast(toast, 'Error', 'Some error occurred. Please try again later.')
        }
    }

    return (
        <Flex width="100%" flexDir="column" mt="5">
            <Heading fontSize="2xl" mb="5">Login</Heading>
            <FormControl isRequired mb="3">
                <FormLabel>Email address</FormLabel>
                <Input type='email' placeholder='Enter mail' value={loginData.email} onChange={(e) => setLoginData((prev) => ({ ...prev, email: e.target.value }))} autoComplete="off" />
                <FormHelperText>use kongu.edu or kongu.ac.in</FormHelperText>
            </FormControl>
            <FormControl isRequired mb="5">
                <FormLabel>Password</FormLabel>
                <InputGroup size='md'>
                    <Input
                        pr='4.5rem'
                        type={show ? 'text' : 'password'}
                        placeholder='Enter password'
                        value={loginData.password}
                        onChange={(e) => setLoginData((prev) => ({ ...prev, password: e.target.value }))}
                    />
                    <InputRightElement width='4.5rem'>
                        <Button h='1.75rem' size='sm' onClick={handleClick}>
                            {show ? 'Hide' : 'Show'}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>
            <Flex width="100%" gap="1">
                <Text fontSize="md" fontWeight="500">Don't have an account?</Text>
                <Text fontSize="md" color="blue.400" fontWeight="500" cursor="pointer" _hover={{ color: "blue.300" }} decoration="underline" onClick={() => setIsLogin(false)}>Sign Up</Text>
            </Flex>
            <Flex justifyContent='end' width='100%'>
                <Button colorScheme="blue" rightIcon={<FiChevronsRight />} onClick={loginConnection}>
                    Get In
                </Button>
            </Flex>
        </Flex>
    );
}

const SignUp = ({ setIsLogin }: SignUpProps) => {
    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)

    const [signupData, setSignUpData] = useState<signupDataType>({
        name: '',
        email: '',
        password: '',
        contact: '',
        role: 'Student'
    })

    const toast = useToast()
    const navigate = useNavigate()
    const setUserState = useSetRecoilState(userAtom)

    const signupConnection = async () => {
        if (signupData.name === '') {
            errToast(toast, 'Field Missing.', 'Please fill name to continue further')
            return
        }
        const isValid = validateEmailNdPassword(signupData.email, signupData.password, toast);
        if (!isValid) {
            return
        }
        if (signupData.contact === '') {
            errToast(toast, 'Field Missing.', 'Please fill contact to continue further')
            return
        }
        const response = await axios.post(baseURL + signup, {
            ...signupData,
            role: {
                type: signupData.role.toLowerCase(),
                collection: 'user'
            }
        })
        console.log(response)
        if (response.data.desc === 'Email already exist') {
            errToast(toast, 'User already found.', 'Please Login with your registered email')
            return
        }
        if (response.data.status) {
            successToast(toast, 'Success', 'You have successfully registered')
            localStorage.setItem('email', response.data.data.email)
            setUserState(response.data.data);
            navigate('/')
        } else {
            errToast(toast, 'Error', 'Some error occurred. Please try again later.')
        }
    }

    return (
        <Flex width="100%" flexDir="column" mt="5">
            <Heading fontSize="2xl" mb="5">Sign Up</Heading>
            <FormControl isRequired mb="3">
                <FormLabel>Name</FormLabel>
                <Input type='text' placeholder="Enter name" value={signupData.name} onChange={(e) => setSignUpData((prev) => ({ ...prev, name: e.target.value }))} />
            </FormControl>
            <FormControl isRequired mb="3">
                <FormLabel>Email address</FormLabel>
                <Input type='email' placeholder='Enter email' value={signupData.email} onChange={(e) => setSignUpData((prev) => ({ ...prev, email: e.target.value }))} />
                <FormHelperText>use kongu.edu or kongu.ac.in</FormHelperText>
            </FormControl>
            <FormControl isRequired mb="3">
                <FormLabel>Contact</FormLabel>
                <InputGroup>
                    <InputLeftAddon children='+91' />
                    <Input type='tel' placeholder='phone number' value={signupData.contact} onChange={(e) => setSignUpData((prev) => ({ ...prev, contact: e.target.value }))} />
                </InputGroup>
            </FormControl>
            <FormControl as='fieldset' mb='3' isRequired>
                <FormLabel as='legend'>Role</FormLabel>
                <RadioGroup defaultValue={signupData.role} onChange={(e) => setSignUpData((prev) => ({ ...prev, role: e }))}>
                    <HStack spacing='24px'>
                        <Radio value='Student'>Student</Radio>
                        <Radio value='Faculty'>Faculty</Radio>
                    </HStack>
                </RadioGroup>
            </FormControl>
            <FormControl isRequired mb="5">
                <FormLabel>Password</FormLabel>
                <InputGroup size='md'>
                    <Input
                        pr='4.5rem'
                        type={show ? 'text' : 'password'}
                        placeholder='Enter password'
                        value={signupData.password}
                        onChange={(e) => setSignUpData((prev) => ({ ...prev, password: e.target.value }))}
                    />
                    <InputRightElement width='4.5rem'>
                        <Button h='1.75rem' size='sm' onClick={handleClick}>
                            {show ? 'Hide' : 'Show'}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>
            <Flex width="100%" gap="1">
                <Text fontSize="md" fontWeight="500">Already have an account?</Text>
                <Text fontSize="md" color="blue.400" fontWeight="500" cursor="pointer" _hover={{ color: "blue.300" }} decoration="underline" onClick={() => setIsLogin(true)}>Log In</Text>
            </Flex>
            <Flex justifyContent='end' width='100%'>
                <Button colorScheme="blue" rightIcon={<FiChevronsRight />} onClick={signupConnection}>
                    Get In
                </Button>
            </Flex>
        </Flex>
    );
}

const Authenticate = () => {
    const [isLogin, setIsLogin] = useState(true);
    const setUserData = useSetRecoilState(userAtom)
    const navigate = useNavigate()

    const fetch = async (email: string) => {
        const response = await axios.get(baseURL + getUserByMail, {
            params: { email }
        })
        setUserData(response.data.data)
    }

    useEffect(() => {
        const email = localStorage.getItem('email');
        if (email) {
            fetch(email);
            navigate('/')
        }
    }, []);

    return (
        <Flex width="100%" height="$100vh" flexDir="column" alignItems="center" justifyContent="center">
            <Flex px="12" py="10" flexDir="column" style={{ boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px' }} width="2xl" alignItems="center" justifyContent="center">
                <Heading fontWeight="700" fontSize="3xl">KEC Hall Booking</Heading>
                {isLogin ? <Login setIsLogin={setIsLogin} /> : <SignUp setIsLogin={setIsLogin} />}
            </Flex>
        </Flex>
    )
}

export default Authenticate