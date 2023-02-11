import { Badge, Box, Button, Divider, Flex, Heading, IconButton, Image, Text, VStack } from '@chakra-ui/react'
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
import {
    Chart as ChartJS, ArcElement, CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
} from "chart.js";
import { Doughnut, Line } from "react-chartjs-2";
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import ReactDataGrid from '@inovua/reactdatagrid-community';
import '@inovua/reactdatagrid-community/base.css';
import '@inovua/reactdatagrid-community/theme/default-light.css';

const headerProps = {
    style: {
        fontWeight: 'bold',
        fontSize: '1rem',
    },
};

const gridStyle = { minHeight: 484 };

ChartJS.register(ArcElement, CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend);

// const BookedCompoent = ({ item }: { item: any }) => {
//     console.log(item)
//     return (
//         <VStack width="40%" style={{ boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px' }} py="3" px="2" rounded="md" my="5" mx="5" alignItems="start">
//             <Image src={imgs[item.requested_hall.name]} width="100%" height="200px" />
//             <Divider my="2" />
//             <Flex alignItems="baseline" gap="2">
//                 <Heading fontSize="2xl">{item.requested_hall.name}</Heading>
//                 <Badge colorScheme="orange">{item.requested_by.status}</Badge>
//             </Flex>
//             <Text><b>Incharge: </b>{item.requested_hall.incharge.name} ({item.requested_hall.incharge.contact})</Text>
//             <Divider my="2" />
//             <Text><b>Club:</b> {item.event.club.name} - <b>Staff:</b> {item.event.staff_incharge.name}</Text>
//             <Text><b>Event:</b> {item.event.name}</Text>
//         </VStack >
//     )
// }

// const FreeComponent = ({ item }: { item: any }) => {
//     return (
//         <VStack width="40%" style={{ boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px' }} py="3" px="2" rounded="md" my="5" mx="5" alignItems="start">
//             <Image src={imgs[item.name]} width="100%" height="200px" />
//             <Divider my="2" />
//             <Heading fontSize="2xl">{item.name}</Heading>
//             <Text><b>Incharge: </b>{item.incharge.name} ({item.incharge.contact})</Text>
//             <Divider my="2" />

//         </VStack >
//     )
// }

const Dashboard = () => {
    const navigate = useNavigate()
    const user = useRecoilValue(userAtom)
    const [result, setResult] = useState<any>([])
    const setLoading = useSetRecoilState(loadingAtom)

    const fetch = async () => {
        const response = await axios.get(baseURL + getDashboard)
        setResult(response.data.data)
        console.log(response.data.data);
        setLoading(false)
    }

    useEffect(() => {
        if (user.role.collection === 'user') {
            navigate('/history')
        }
        setLoading(true)
        fetch()
    }, [])

    const dataDoughnut = {
        labels: ['Used', 'Unused'],
        datasets: [
            {
                label: 'Today\'s report',
                data: [result[0]?.usedHalls?.length, result[0]?.unusedHalls?.length],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    //   'rgba(255, 206, 86, 0.2)',
                ],
                borderColor: [
                    'rgb(255, 99, 132)',
                    'rgb(54, 162, 235)',
                ],
                borderWidth: 1,
            },
        ],
    };

    const date = new Date();

    const dataUsedNdUnUsed = {
        labels: [
            moment(date).format('YYYY-MM-DD'),
            moment(date.setDate(date.getDate() + 1)).format('YYYY-MM-DD'),
            moment(date.setDate(date.getDate() + 1)).format('YYYY-MM-DD'),
            moment(date.setDate(date.getDate() + 1)).format('YYYY-MM-DD'),
            moment(date.setDate(date.getDate() + 1)).format('YYYY-MM-DD'),
            moment(date.setDate(date.getDate() + 1)).format('YYYY-MM-DD'),
            moment(date.setDate(date.getDate() + 1)).format('YYYY-MM-DD'),
        ],
        datasets: [{
            label: 'used',
            data: [
                result[0]?.usedHalls?.length,
                result[1]?.usedHalls?.length,
                result[2]?.usedHalls?.length,
                result[3]?.usedHalls?.length,
                result[4]?.usedHalls?.length,
                result[5]?.usedHalls?.length,
                result[6]?.usedHalls?.length,
            ],
            fill: false,
            borderColor: 'rgb(255, 99, 132)',
            tension: 0.1
        },
        {
            label: 'un used',
            data: [
                result[0]?.unusedHalls?.length,
                result[1]?.unusedHalls?.length,
                result[2]?.unusedHalls?.length,
                result[3]?.unusedHalls?.length,
                result[4]?.unusedHalls?.length,
                result[5]?.unusedHalls?.length,
                result[6]?.unusedHalls?.length,
            ],
            fill: false,
            borderColor: 'rgb(54, 162, 235)',
            tension: 0.1
        }]
    }

    const [tableData, setTableData] = useState<any>([])

    const columns = [
        {
            name: 'date',
            header: 'Date',
            sortable: false,
            render: ({ value }: { value: string }) => {
                return (
                    <Text fontSize="md">{value}</Text>
                );
            },
            headerProps,
            defaultVisible: false,
        },
        {
            name: 'unusedHalls',
            header: 'Un used halls',
            sortable: false,
            render: ({ value }: { value: string }) => {
                return (
                    <Text fontSize="md">{value}</Text>
                );
            },
            headerProps,
            defaultVisible: false,
        },
        {
            name: 'usedHalls',
            header: 'Used halls',
            sortable: false,
            render: ({ value }: { value: string }) => {
                return (
                    <Text fontSize="md">{value}</Text>
                );
            },
            headerProps,
            defaultVisible: false,
        },
        {
            name: 'toCap',
            header: 'Total capacity',
            sortable: false,
            render: ({ value }: { value: string }) => {
                return (
                    <Text fontSize="md">{value}</Text>
                );
            },
            headerProps,
            defaultVisible: false,
        },
        {
            name: 'ocCap',
            header: 'Occupied capacity',
            sortable: false,
            render: ({ value }: { value: string }) => {
                return (
                    <Text fontSize="md">{value}</Text>
                );
            },
            headerProps,
            defaultVisible: false,
        },
    ];

    useEffect(() => {
        setTableData([])
        result.map((item: any, index: number) => {
            let ocCap = 0;
            let toCap = 0
            for (let i = 0; i < item?.usedHalls.length; i++) {
                ocCap += item?.usedHalls[i]?.event?.event_capacity;
                toCap += item?.usedHalls[i]?.requested_hall.capacity;
            }
            const obj = {
                date: item?.date,
                usedHalls: item?.usedHalls.length,
                unusedHalls: item?.unusedHalls.length,
                ocCap,
                toCap,
            }
            setTableData((prev: any) => [...prev, obj])
        })
        console.log(tableData)
    }, [result]);

    // const [currentActive, setCurrentActive] = useState(0);

    return (
        <Flex width="100%" flexDir="column">
            <Navbar />
            <Divider mb="5" />
            <Heading fontSize="2xl" px="10">Usage analytics</Heading>
            <Flex width="100%" px="10" justifyContent="space-between" alignItems="baseline">
                <Flex width="30%" flexDir="column" alignItems="center" gap="3">
                    <Doughnut data={dataDoughnut} />
                    <Text color="gray"><b>Today's report</b></Text>
                </Flex>
                <Flex width="65%" flexDir="column" alignItems="center" gap="3">
                    <Line data={dataUsedNdUnUsed} />
                    <Text color="gray"><b>This week's report</b></Text>
                </Flex>
            </Flex>
            <Flex width="100%" alignItems="center" justifyContent="space-between" mt="10" px="10" >
                <Heading fontSize="2xl" >Usage Reports</Heading>
                <Flex gap="3">
                    <Button>Generate Report</Button>
                    {/* <Flex gap="2">
                        <IconButton aria-label='icon' icon={<FiChevronLeft />} isDisabled={currentActive == 0} onClick={() => setCurrentActive(currentActive - 1)} />
                        <Button isDisabled>{result[currentActive]?.date}</Button>
                        <IconButton aria-label='icon' icon={<FiChevronRight />} isDisabled={currentActive == 6} onClick={() => setCurrentActive(currentActive + 1)} />
                    </Flex> */}
                </Flex>
            </Flex>
            <Flex px="10" mt="2">
                <ReactDataGrid
                    idProperty="id"
                    style={gridStyle}
                    columns={columns}
                    pagination
                    dataSource={tableData}
                    defaultLimit={10}
                    rowHeight={60}
                />
            </Flex>
            <Divider my="5" />
        </Flex>
    )
}

export default Dashboard