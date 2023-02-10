import { Box, Button, Divider, Flex, FormControl, FormLabel, HStack, Input, Radio, RadioGroup, Select } from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";
import { DateRange, DayPicker } from "react-day-picker";
import { FiChevronsDown } from "react-icons/fi";
import { clubType } from "../Pages/Bookings";

interface Props {
    isSingleDayEvent: string,
    selectedDate: Date | undefined,
    selectedRange: DateRange | undefined,
    setIsSingleDayEvent: Dispatch<SetStateAction<string>>,
    setSelectedDate: Dispatch<SetStateAction<Date | undefined>>,
    setSelectedRange: Dispatch<SetStateAction<DateRange | undefined>>,
    clubs: [] | [clubType],
    selectedClub: clubType | undefined,
    setSelectedClub: Dispatch<SetStateAction<clubType | undefined>>,
    capacity: number,
    setCapacity: Dispatch<SetStateAction<number>>
    hall: string,
    setHall: Dispatch<SetStateAction<string>>
    eventName: string,
    setEventName: Dispatch<SetStateAction<string>>
}

const halls = ['Classroom', 'Laboratory', 'Seminar Hall', 'Maharaja Auditorium', 'Conventional Centre']

const FilterSection = ({ isSingleDayEvent, setIsSingleDayEvent, selectedDate, setSelectedDate, selectedRange, setSelectedRange, clubs, selectedClub, setSelectedClub, capacity, setCapacity, setHall, hall, eventName, setEventName }: Props) => {


    return (
        <Flex flexDir="column" width="100%" alignItems="center" justifyContent="center" px="8">
            <Flex flexDir="row" width="100%" alignItems="center" justifyContent="center" gap="5">
                <Flex flexDir="column" width="50%">
                    <FormControl mb="3" isRequired>
                        <FormLabel>Club Name</FormLabel>
                        <Select placeholder='Select option' onChange={(e) => setSelectedClub(clubs[parseInt(e.target.value)])} >
                            {clubs.map((item, index) => <option value={index} key={index}>{item['name']}</option>)}
                        </Select>
                    </FormControl>
                    <FormControl isRequired mb="3">
                        <FormLabel>Staff Coordinator</FormLabel>
                        <Input type='text' value={selectedClub?.faculty_coordinator.name} disabled />
                    </FormControl>
                    <FormControl isRequired mb="3">
                        <FormLabel>Event Name</FormLabel>
                        <Input type='text' placeholder="Enter event name" value={eventName} onChange={(e) => setEventName(e.target.value)} />
                    </FormControl>
                    <FormControl isRequired mb="3">
                        <FormLabel>Event Capacity</FormLabel>
                        <Input type='number' placeholder="Enter event capacity" value={capacity} onChange={(e) => setCapacity(parseInt(e.target.value))} />
                    </FormControl>
                    <FormControl mb="3" isRequired>
                        <FormLabel>Required Hall</FormLabel>
                        <Select placeholder='Select option' value={hall} onChange={(e) => setHall(e.target.value)}>
                            {halls.map((item, index) => <option value={item} key={index}>{item}</option>)}
                        </Select>
                    </FormControl>
                </Flex>
                <Flex flexDir="column" width="50%" alignItems="center" justifyContent="center">
                    <Box borderRadius="md" px="6" py="2" style={{ boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px' }} mb="4">
                        <RadioGroup defaultValue='1' onChange={setIsSingleDayEvent} value={isSingleDayEvent}>
                            <HStack spacing='24px'>
                                <Radio value='1'>One day event</Radio>
                                <Radio value='2'>Multi day event</Radio>
                            </HStack>
                        </RadioGroup>
                    </Box>
                    {isSingleDayEvent === '1' ? <DayPicker
                        mode='single'
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        fromDate={new Date()}
                        showOutsideDays
                    /> : <DayPicker
                        mode='range'
                        selected={selectedRange}
                        onSelect={setSelectedRange}
                        fromDate={new Date()}
                        showOutsideDays
                    />}
                </Flex>
            </Flex>
        </Flex>
    );
}

export default FilterSection;