import { Avatar, Box, Flex, Heading, HStack, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { MdNotificationsNone } from 'react-icons/md'
import { useRecoilValue } from 'recoil'
import { userAtom } from '../state/atom'

const Navbar = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const user = useRecoilValue(userAtom)

    const nav = {
        '/': 'Dashboard',
        '/bookings': 'Bookings',
        '/history': 'History',
        '/notifications': 'Notifications',
        '/profile': 'Profile',
        '/track': 'Track Status',
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
                    name={user.name}
                    // onClick={() => navigate('/profile')}
                    cursor="pointer"
                />
            </Flex>
        </Flex>
    )
}

export default Navbar