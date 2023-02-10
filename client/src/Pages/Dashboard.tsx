import { Divider, Flex, Heading, Image, Text, VStack } from '@chakra-ui/react'
import axios from 'axios'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import Marquee from 'react-fast-marquee'
import { useNavigate } from 'react-router-dom'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import Navbar from '../Components/Navbar'
import { loadingAtom, userAtom } from '../state/atom'
import { baseURL, getDashboard } from '../utils/connection'
import { imgs } from '../utils/imageStrings'

const BookedCompoent = ({ item }: { item: any }) => {
    console.log(item)
    return (
        <VStack width="40%" style={{ boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px' }} py="3" px="2" rounded="md" my="5" mx="5" alignItems="start">
            <Image src={imgs[item.requested_hall.name]} width="100%" height="200px" />
            <Divider my="2" />
            <Heading fontSize="2xl">{item.requested_hall.name}</Heading>
            <Text><b>Incharge: </b>{item.requested_hall.incharge.name} ({item.requested_hall.incharge.contact})</Text>
            <Divider my="2" />
        </VStack >
    )
}

const FreeComponent = ({ item }: { item: any }) => {
    return (
        <VStack width="40%" style={{ boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px' }} py="3" px="2" rounded="md" my="5" mx="5" alignItems="start">
            <Image src={imgs[item.name]} width="100%" height="200px" />
            <Divider my="2" />
            <Heading fontSize="2xl">{item.name}</Heading>
            <Text><b>Incharge: </b>{item.incharge.name} ({item.incharge.contact})</Text>
            <Divider my="2" />

        </VStack >
    )
}

const Dashboard = () => {
    const navigate = useNavigate()
    const user = useRecoilValue(userAtom)
    const [used, setUsed] = useState<any>([])
    const [free, setFree] = useState<any>([])
    const setLoading = useSetRecoilState(loadingAtom)

    const fetch = async () => {
        const response = await axios.get(baseURL + getDashboard, {
            params: { user_id: user._id }
        })
        setUsed(response.data.data.usedHalls)
        setFree(response.data.data.unusedHalls)
        console.log(used);
        // setLoading(false)
    }

    useEffect(() => {
        if (user.role.collection === 'user') {
            navigate('/history')
        }
        // setLoading(true)
        fetch()
    }, [])

    return (
        <Flex width="100%" flexDir="column">
            <Navbar />
            <Flex flexDir="column" width="100%" px="8">
                <Heading fontSize="4xl" mb="2">Dear {user.name}</Heading>
                <Text fontSize="2xl">Reports for <b>{moment().format('Do MMMM YYYY')}</b></Text>
                <Divider my="4" />
                <Heading>Booked Halls</Heading>
                <Marquee gradient={false} speed={50}>
                    {
                        used.map((item: any, index: number) => <BookedCompoent key={index} item={item} />)
                    }
                </Marquee>
                <Heading>Free Halls</Heading>
                <Marquee gradient={false} speed={50}>
                    {
                        free.map((item: any, index: number) => <FreeComponent key={index} item={item} />)
                    }
                </Marquee>
            </Flex>
        </Flex>
    )
}

export default Dashboard