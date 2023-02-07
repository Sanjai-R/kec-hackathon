import { Flex } from '@chakra-ui/react'
import React from 'react'
import Navbar from '../Components/Navbar'

const Dashboard = () => {
    return (
        <Flex width="100%" flexDir="column">
            <Navbar />
        </Flex>
    )
}

export default Dashboard