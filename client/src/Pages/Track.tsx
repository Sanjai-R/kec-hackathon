import { Button, Flex, IconButton, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar'
import { Timeline, TimelineItem } from 'vertical-timeline-component-for-react';
import axios from 'axios';
import { baseURL, track } from '../utils/connection';
import { useLocation } from 'react-router-dom';
import moment from 'moment';
import { GrRefresh } from 'react-icons/gr'

const color = {
    pending: '#F29C00',
    appproval: '#90EE8F',
    rejected: '#FF9B9A'
}

const Track = () => {
    const [result, setResult] = useState<any>([])
    const location = useLocation()
    const fetch = async () => {
        setResult([])
        const response = await axios.get(baseURL + track, {
            params: {
                bookingId: location.state._id,
            }
        })
        setResult(response.data.data)
        console.log(response.data.data)
    }

    useEffect(() => {
        fetch()
    }, [])

    return (
        <Flex width="100%" flexDir="column">
            <Navbar />
            <Flex width="100%" px="10" justifyContent="end">
                <Button aria-label='icon-button' leftIcon={<GrRefresh />} onClick={fetch} size="lg" >Refresh</Button>
            </Flex>
            {
                result.length !== 0 ?
                    <Timeline>
                        <TimelineItem
                            key="001"
                            dateText="Application Submitted"
                            dateInnerStyle={{ background: color.appproval, color: '#000' }}
                        >
                            <Text>Application Submitted on</Text>
                            <Text>{moment(result.schedule.date).format('MMMM Do YYYY')}</Text>
                        </TimelineItem>
                        {
                            result.requested_by.tracking.map((item: any, index: number) => {
                                return (
                                    <TimelineItem
                                        key={index}
                                        dateText={item.tracking.charAt(0).toUpperCase() + item.tracking.slice(1)}
                                        dateInnerStyle={{ background: color[item.tracking] }}
                                    >
                                        <p>{item.authorizer} {
                                            item.tracking === 'approved' ? ' - ✅ Approved' : item.tarcking === 'rejected' ? ' - ❌ Rejected' : ' - 🧐 Awaiting action'
                                        }</p>
                                    </TimelineItem>

                                )
                            })
                        }
                    </Timeline>
                    : ''
            }
        </Flex>
    )
}

export default Track