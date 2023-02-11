import { Badge, Box, Button, Divider, Flex, Heading, IconButton, Image, Text, VStack } from '@chakra-ui/react'
import axios from 'axios'
import moment from 'moment'
import React, { cloneElement, ReactElement, useEffect, useMemo, useState } from 'react'
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

import 'react-data-grid/lib/styles.css';
import DataGrid, { DataGridProps } from 'react-data-grid';
import { AiOutlineDownload } from 'react-icons/ai'
import { GrRefresh } from 'react-icons/gr'

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
        setLoading(true)
        const response = await axios.get(baseURL + getDashboard)
        setResult(response.data.data)
        console.log(response.data.data);
        setLoading(false)
    }

    useEffect(() => {
        if (user.role.collection === 'user') {
            navigate('/history')
        }
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
    const gridStyle = { minHeight: 550 };

    const columns = [
        {
            key: 'date',
            name: 'Date',
            width: 200
        },
        {
            key: 'usedHalls',
            name: 'Used Halls',
            width: 200

        },
        {
            key: 'unusedHalls',
            name: 'Unused Halls',
            width: 200
        },
        {
            key: 'toCap',
            name: 'Total capacity',
            width: 200
        },
        {
            key: 'ocCap',
            name: 'Occupied Capacity',
            width: 200
        },
    ];

    async function exportToCsv<R, SR>(
        gridElement: ReactElement<DataGridProps<R, SR>>,
        fileName: string
    ) {
        const { head, body, foot } = await getGridContent(gridElement);
        const content = [...head, ...body, ...foot]
            .map((cells) => cells.map(serialiseCellValue).join(','))
            .join('\n');

        downloadFile(fileName, new Blob([content], { type: 'text/csv;charset=utf-8;' }));
    }

    async function getGridContent<R, SR>(gridElement: ReactElement<DataGridProps<R, SR>>) {
        const { renderToStaticMarkup } = await import('react-dom/server');
        const grid = document.createElement('div');
        grid.innerHTML = renderToStaticMarkup(
            cloneElement(gridElement, {
                enableVirtualization: false
            })
        );

        return {
            head: getRows('.rdg-header-row'),
            body: getRows('.rdg-row:not(.rdg-summary-row)'),
            foot: getRows('.rdg-summary-row')
        };

        function getRows(selector: string) {
            return Array.from(grid.querySelectorAll<HTMLDivElement>(selector)).map((gridRow) => {
                return Array.from(gridRow.querySelectorAll<HTMLDivElement>('.rdg-cell')).map(
                    (gridCell) => gridCell.innerText
                );
            });
        }
    }


    function serialiseCellValue(value: unknown) {
        if (typeof value === 'string') {
            const formattedValue = value.replace(/"/g, '""');
            return formattedValue.includes(',') ? `"${formattedValue}"` : formattedValue;
        }
        return value;
    }

    function downloadFile(fileName: string, data: Blob) {
        const downloadLink = document.createElement('a');
        downloadLink.download = fileName;
        const url = URL.createObjectURL(data);
        downloadLink.href = url;
        downloadLink.click();
        URL.revokeObjectURL(url);
    }

    const gridElement = (
        <DataGrid columns={columns} rows={tableData} className="rdg-light" />
    )


    useMemo(() => {
        setTableData([])
        const arr = []
        for (let i = 0; i < result.length; i++) {
            let ocCap = 0;
            let toCap = 0
            for (let j = 0; j < result[i].usedHalls.length; j++) {
                ocCap += result[i]?.usedHalls[j]?.event?.event_capacity;
                toCap += result[i]?.usedHalls[j]?.requested_hall.capacity;
            }
            const obj = {
                date: result[i]?.date,
                usedHalls: result[i]?.usedHalls.length,
                unusedHalls: result[i]?.unusedHalls.length,
                ocCap,
                toCap,
            }
            arr.push(obj)
        }
        setTableData(arr)
        console.log(tableData)
    }, [result]);

    // const [currentActive, setCurrentActive] = useState(0);

    return (
        <Flex width="100%" flexDir="column">
            <Navbar />
            <Divider mb="5" />
            <Flex width="100%" px="10" justifyContent="end">
                <Button aria-label='icon-button' leftIcon={<GrRefresh />} onClick={fetch} size="lg" >Refresh</Button>
            </Flex>
            <Heading fontSize="2xl" px="10">Usage analytics</Heading>
            <Flex width="100%" px="10" justifyContent="space-between" alignItems="baseline">
                <Flex width="30%" flexDir="column" alignItems="center" gap="3">
                    <Doughnut data={dataDoughnut} />
                    <Text color="gray"><b>Today's report - {moment().format('Do MMM YYYY')}</b></Text>
                </Flex>
                <Flex width="65%" flexDir="column" alignItems="center" gap="3">
                    <Line data={dataUsedNdUnUsed} />
                    <Text color="gray"><b>This week's report</b></Text>
                </Flex>
            </Flex>
            <Flex width="100%" alignItems="center" justifyContent="space-between" mt="10" px="10" >
                <Heading fontSize="2xl" >Usage Reports</Heading>
                <Flex gap="3">
                    <Button onClick={() => exportToCsv(gridElement, `report-from:${tableData[0]?.date}:to:${tableData[1]?.date}.csv`)} rightIcon={<AiOutlineDownload size="25" />}>Generate Report (.csv)</Button>
                    {/* <Button onClick={() => exportToXlsx(gridElement, 'data.xlsx')}>Generate Report (.xlsx)</Button> */}
                    {/* <Flex gap="2">
                        <IconButton aria-label='icon' icon={<FiChevronLeft />} isDisabled={currentActive == 0} onClick={() => setCurrentActive(currentActive - 1)} />
                        <Button isDisabled>{result[currentActive]?.date}</Button>
                        <IconButton aria-label='icon' icon={<FiChevronRight />} isDisabled={currentActive == 6} onClick={() => setCurrentActive(currentActive + 1)} />
                    </Flex> */}
                </Flex>
            </Flex>
            <Flex px="10" mt="2" width="100%" mb="4">
                {gridElement}
            </Flex>
            <Divider my="5" />
        </Flex>
    )
}

export default Dashboard