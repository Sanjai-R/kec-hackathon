import { Flex, Heading, Spacer, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import Navbar from '../Components/Navbar'
import { DateRange } from 'react-day-picker'
import 'react-day-picker/dist/style.css';
import HallCard from '../Components/HallCard';
import FilterSection from '../Components/FilterSection';

const Bookings = () => {
    const [isSingleDayEvent, setIsSingleDayEvent] = useState('1')
    const [selectedDate, setSelectedDate] = React.useState<Date>();
    const [selectedRange, setSelectedRange] = useState<DateRange | undefined>();

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
            />
            <Flex gap="1" alignItems="stretch" mb="4" px="10" mt="6">
                <Heading fontSize="2xl">Potential Match</Heading>
                <Text fontWeight="600">(2)</Text>
            </Flex>
            <HallCard />
            <HallCard />
            <Flex gap="1" alignItems="stretch" mb="4" px="10">
                <Heading fontSize="2xl">Alternatives</Heading>
                <Text fontWeight="600">(2)</Text>
            </Flex>
            <HallCard />
        </Flex>
    )
}

export default Bookings