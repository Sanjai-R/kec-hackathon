import { Badge, Button, Divider, Flex, Heading, Image, Text, VStack } from '@chakra-ui/react'
import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import Navbar from '../Components/Navbar'
import { userAtom } from '../state/atom';
import { baseURL, history } from '../utils/connection';
import { imgs } from '../utils/imageStrings';

const Component = ({ item }: { item: any }) => {
    const navigate = useNavigate();

    console.log(item)

    return (
        <VStack width="30%" style={{ boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px' }} py="3" px="2" rounded="md" my="5" mx="2" alignItems="start">
            <Image src={imgs[item.requested_hall.name]} width="100%" height="200px" />
            <Divider my="2" />
            <Flex alignItems="baseline" gap="2">
                <Heading fontSize="2xl">{item.requested_hall.name}</Heading>
                <Badge colorScheme="orange">{item.requested_by.status}</Badge>
            </Flex>
            <Text><b>Incharge: </b>{item.requested_hall.incharge.name} ({item.requested_hall.incharge.contact})</Text>
            <Divider my="2" />
            <Text><b>Club:</b> {item.event.club.name} - <b>Staff:</b> {item.event.staff_incharge.name}</Text>
            <Text><b>Event:</b> {item.event.name}</Text>
            <Text><b>On:</b> {moment(item.schedule.date).format('Do MMM YYYY')}</Text>
            <Divider my="2" />
            {
                item.requested_by.status === 'pending' ? <Button onClick={() => navigate('/track', { state: { _id: item._id } })} width="full" colorScheme="blue">Track Status</Button>
                    : ''}
        </VStack >
    )
}

const History = () => {
    const user = useRecoilValue(userAtom)
    const [result, setResult] = useState<any>([])

    const fetch = async () => {
        const response = await axios.get(baseURL + history, {
            params: { userId: user._id }
        })
        if (response.data.status) {
            setResult(response.data.data)
            console.log(result)
        } else {
            setResult([])
        }
    }

    useEffect(() => {
        fetch()
    }, []);

    return (
        <Flex width="100%" flexDir="column" mb="10">
            <Navbar />
            {result.length !== 0 ? <Flex width="100%" flexWrap="wrap" gap="3" px="8">
                {
                    result.map((item: any, index: number) =>
                        <Component item={item} key={index} />
                    )
                }
            </Flex> : ''}
        </Flex>
    )
};



export default History