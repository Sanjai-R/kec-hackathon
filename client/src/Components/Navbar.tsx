import { Avatar, Box, Flex, Heading, HStack, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { MdNotificationsNone } from 'react-icons/md'

const Navbar = () => {
    const navigate = useNavigate()
    const location = useLocation()

    const nav = {
        '/': 'Dashboard',
        '/history': 'History',
        '/notifications': 'Notifications',
        '/profile': 'Profile',
    }

    return (
        <Flex width="100%" px="8" py="6" alignItems="center" justifyContent="space-between">
            <Heading>{nav[location.pathname as keyof typeof nav]}</Heading>
            <Flex alignItems="center" gap="3">
                <Box px="3" py="3" _hover={{ bg: 'gray.100' }} borderRadius="full" cursor="pointer" onClick={() => navigate('/notifications')}>
                    <MdNotificationsNone size="30" />
                </Box>
                <Avatar
                    size="md"
                    name='Nanthakumaran S'
                    src={'https://avatars.githubusercontent.com/u/59391441?v=4'}
                    onClick={() => navigate('/profile')}
                />
            </Flex>
        </Flex>
    )
}

export default Navbar