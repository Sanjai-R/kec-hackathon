import { Button, Flex, FormControl, FormHelperText, FormLabel, Heading, HStack, Input, InputGroup, InputLeftAddon, InputRightElement, Radio, RadioGroup, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import { FiChevronsRight } from 'react-icons/fi';

const Authenticate = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)

    const Login = () => {
        return (
            <Flex width="100%" flexDir="column" mt="5">
                <Heading fontSize="2xl" mb="5">Login</Heading>
                <FormControl isRequired mb="3">
                    <FormLabel>Email address</FormLabel>
                    <Input type='email' placeholder='Enter mail' />
                    <FormHelperText>use kongu.edu or kongu.ac.in</FormHelperText>
                </FormControl>
                <FormControl isRequired mb="5">
                    <FormLabel>Password</FormLabel>
                    <InputGroup size='md'>
                        <Input
                            pr='4.5rem'
                            type={show ? 'text' : 'password'}
                            placeholder='Enter password'
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
                    <Button colorScheme="blue" rightIcon={<FiChevronsRight />}>
                        Get In
                    </Button>
                </Flex>
            </Flex>
        );
    }

    const SignUp = () => {
        return (
            <Flex width="100%" flexDir="column" mt="5">
                <Heading fontSize="2xl" mb="5">Sign Up</Heading>
                <FormControl isRequired mb="3">
                    <FormLabel>Name</FormLabel>
                    <Input type='text' placeholder="Enter name" />
                </FormControl>
                <FormControl isRequired mb="3">
                    <FormLabel>Email address</FormLabel>
                    <Input type='email' placeholder='Enter email' />
                    <FormHelperText>use kongu.edu or kongu.ac.in</FormHelperText>
                </FormControl>
                <FormControl isRequired mb="3">
                    <FormLabel>Contact</FormLabel>
                    <InputGroup>
                        <InputLeftAddon children='+91' />
                        <Input type='tel' placeholder='phone number' />
                    </InputGroup>
                </FormControl>
                <FormControl as='fieldset' mb='3' isRequired>
                    <FormLabel as='legend'>Role</FormLabel>
                    <RadioGroup defaultValue='Itachi'>
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
                    <Button colorScheme="blue" rightIcon={<FiChevronsRight />}>
                        Get In
                    </Button>
                </Flex>
            </Flex>
        );
    }

    return (
        <Flex width="100%" height="$100vh" flexDir="column" alignItems="center" justifyContent="center">
            <Flex px="12" py="10" flexDir="column" style={{ boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px' }} width="2xl" alignItems="center" justifyContent="center">
                <Heading fontWeight="700" fontSize="3xl">KEC Hall Booking</Heading>
                {isLogin ? <Login /> : <SignUp />}
            </Flex>
        </Flex>
    )
}

export default Authenticate