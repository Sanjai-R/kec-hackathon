import { Button, Divider, Flex, Heading, Spacer, Text, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar'
import { DateRange } from 'react-day-picker'
import 'react-day-picker/dist/style.css';
import HallCard from '../Components/HallCard';
import FilterSection from '../Components/FilterSection';
import { useRecoilValue } from 'recoil';
import { userAtom } from '../state/atom';
import axios from 'axios';
import { baseURL, getClub } from '../utils/connection';
import { errToast } from '../Components/Toast';
import { FiChevronsDown } from 'react-icons/fi';

type user = {
    _id: string;
    contact: string;
    name: string;
    emial: string;
    role: {
        type: string;
        collection: string;
    }
}

export type clubType = {
    name: string;
    faculty_coordinator: user;
    student_coordinator: user;
    _id: string;
    hosted_events: [];
}

const Bookings = () => {
    const [isSingleDayEvent, setIsSingleDayEvent] = useState('1')
    const [selectedDate, setSelectedDate] = React.useState<Date>();
    const [selectedRange, setSelectedRange] = useState<DateRange | undefined>();
    const user = useRecoilValue(userAtom)

    const [clubs, setClubs] = useState<[clubType] | []>([]);
    const [selectedClub, setSelectedClub] = useState<clubType | undefined>()

    const toast = useToast()
    const [dateArr, setDateArr] = useState<string[]>(['leave']);
    const [water, setWater] = useState(false);
    const [mic, setMic] = useState(false);
    const [projector, setProjector] = useState(false);
    const [speaker, setSpeaker] = useState(false);
    const [ac, setAC] = useState(false);
    const [generator, setGenerator] = useState(false);

    const [selectedPeriods, setSelectedPeriods] = useState<any>([1, 4])

    const fetchClubs = async () => {
        const response = await axios.get(baseURL + getClub, {
            params: {
                type: user.role.type,
                id: user._id,
            }
        });
        if (response.data.desc === "No clubs found") {
            errToast(toast, 'No Clubs found for this user', 'Ask admins to map you with a club')
            return
        }
        setClubs(response.data.data)
        console.log(response.data.data)
    }

    useEffect(() => {
        fetchClubs()
    }, []);

    const dateRangeToDateArr = () => {
        setDateArr(['leave'])
        if (selectedRange?.from !== undefined && selectedRange.to !== undefined) {
            const x = selectedRange.from
            const arr = []
            for (x; x <= selectedRange.to; x.setDate(x.getDate() + 1)) {
                arr.push(x.toDateString())
            }
            setDateArr(arr)
        }
    }

    return (
        <Flex width="100%" flexDir="column">
            <Navbar />
            <Spacer />
            <FilterSection
                isSingleDayEvent={isSingleDayEvent}
                selectedDate={selectedDate}
                selectedRange={selectedRange}
                setIsSingleDayEvent={setIsSingleDayEvent}
                setSelectedDate={setSelectedDate}
                setSelectedRange={setSelectedRange}
                clubs={clubs}
                selectedClub={selectedClub}
                setSelectedClub={setSelectedClub}
            />
            <Flex alignItems="center" justifyContent="center">
                <Button rightIcon={<FiChevronsDown />} leftIcon={<FiChevronsDown />} colorScheme="blue" mt="3" width="md" fontSize="lg" onClick={dateRangeToDateArr}>Filter Halls</Button>
            </Flex>
            <Divider mt="6" />
            <Flex gap="1" alignItems="stretch" mb="4" px="10" mt="6">
                <Heading fontSize="2xl">Potential Match</Heading>
                <Text fontWeight="600">(2)</Text>
            </Flex>
            <HallCard
                isSingleDayEvent={isSingleDayEvent}
                dateArray={dateArr}
                water={water}
                mic={mic}
                projector={projector}
                speaker={speaker}
                ac={ac}
                generator={generator}
                setWater={setWater}
                setMic={setMic}
                setProjector={setProjector}
                setSpeaker={setSpeaker}
                setAC={setAC}
                setGenerator={setGenerator}
                selectedPeriods={selectedPeriods}
                setSelectedPeriods={setSelectedPeriods}
            />
            <Flex gap="1" alignItems="stretch" mb="4" px="10">
                <Heading fontSize="2xl">Alternatives</Heading>
                <Text fontWeight="600">(2)</Text>
            </Flex>
            {/* <HallCard isSingleDayEvent={isSingleDayEvent} /> */}
        </Flex>
    )
}

export default Bookings