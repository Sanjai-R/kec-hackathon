import { Badge, Box, Button, Divider, Flex, FormControl, FormLabel, Heading, HStack, IconButton, Image, Input, Radio, RadioGroup, Select, Spacer, Switch, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import Navbar from '../Components/Navbar'
import { DateRange, DayPicker } from 'react-day-picker'
import 'react-day-picker/dist/style.css';
import { FiChevronsDown, FiChevronsRight, FiSpeaker } from 'react-icons/fi'
import { IoMicOutline } from 'react-icons/io5'
import { RiWindyLine, RiProjector2Line } from 'react-icons/ri'
import { TbBottle } from 'react-icons/tb'
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi'

const sizeOfIcon = 20

const Filter = () => {
    const [isSingleDayEvent, setIsSingleDayEvent] = useState('1')
    const [selectedDate, setSelectedDate] = React.useState<Date>();
    const [selectedRange, setSelectedRange] = useState<DateRange | undefined>();


    return (
        <Flex flexDir="column" width="100%" alignItems="center" justifyContent="center" px="10">
            <Flex flexDir="row" width="100%" alignItems="center" justifyContent="center" gap="5">
                <Flex flexDir="column" width="50%">
                    <FormControl mb="3" isRequired>
                        <FormLabel>Club Name</FormLabel>
                        <Select placeholder='Select option'>
                            <option value='option1'>Coding Club of KEC</option>
                            <option value='option2'>Rotract Club of KEC</option>
                        </Select>
                    </FormControl>
                    <FormControl isRequired mb="3">
                        <FormLabel>Staff Coordinator</FormLabel>
                        <Input type='text' value="R. Parameshwaran" disabled />
                    </FormControl>
                    <FormControl isRequired mb="3">
                        <FormLabel>Event Name</FormLabel>
                        <Input type='text' placeholder="Enter event name" />
                    </FormControl>
                    <FormControl isRequired mb="3">
                        <FormLabel>Event Capacity</FormLabel>
                        <Input type='number' placeholder="Enter event capacity" />
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
            <Button rightIcon={<FiChevronsDown />} leftIcon={<FiChevronsDown />} colorScheme="blue" mt="3" width="md" fontSize="lg">Filter Halls</Button>
            <Divider mt="6" />
        </Flex>
    );
}

const Match = () => {
    const requirements = [
        { name: 'Water', icon: <TbBottle size={sizeOfIcon} /> },
        { name: 'Mic', icon: <IoMicOutline size={sizeOfIcon} /> },
        { name: 'Projector', icon: <RiProjector2Line size={sizeOfIcon} /> },
        { name: 'Speaker', icon: <FiSpeaker size={sizeOfIcon} /> },
        { name: 'AC', icon: <RiWindyLine size={sizeOfIcon} /> },
    ]

    const [isFullDay, setIsFullDay] = useState(false)

    return (
        <Flex flexDir="column" width="100%" alignItems="start" justifyContent="center" px="10">
            <Flex width="100%" flexDir="column" alignItems="center" justifyContent="center">
                <Flex width="100%" justifyContent="center" gap="6">
                    <Image src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRExMWpGkMI9_NHVonC1cUkkUSXG19i2kRjemjlJ1wgYRQSINOXHKepEoU9URVpJItj2LY&usqp=CAU" width="30%" rounded="lg" />
                    <Flex flexDir="column" width="30%" gap="2">
                        <Heading fontSize="lg">Kalingarayan Seminar Hall - Civil Dept</Heading>
                        <Flex alignItems="center" gap="3">
                            <Badge colorScheme="green">Available</Badge>
                            <Text><b>Capacity:</b> 500</Text>
                        </Flex>
                        <Text><b>Incharge:</b> Nanthakumaran S (9080183971)</Text>
                        <Divider />
                        <Flex alignItems="center" gap="3" justifyContent="center" mt="2">
                            <IconButton aria-label='button' icon={<HiChevronLeft color='gray' size={25} />} boxSize="10" />
                            <Button fontSize="sm">10 Feb 2023</Button>
                            <IconButton aria-label='button' icon={<HiChevronRight color='gray' size={25} />} boxSize="10" />
                        </Flex>
                        <Flex alignItems="center" gap="3" mt="2">
                            <Text fontWeight="600">Full Day</Text>
                            <Switch size='md' onChange={() => setIsFullDay(!isFullDay)} />
                        </Flex>
                        {!isFullDay ? <>
                            <Text fontWeight="600">Periods:</Text>
                            <Flex flexWrap="wrap" alignItems="center" gap="2">
                                {Array.from(Array(7).keys()).map((req, index) => <Flex border="1px" borderColor="blackAlpha.300" rounded="md" alignItems="center" justifyContent="center" key={index} px="3.5" py="2" cursor="pointer" _hover={{ bgColor: "gray.50" }}>{req + 1}</Flex>)}
                            </Flex>
                        </> : ''}
                    </Flex>
                    <Flex width="32%" flexDir="column" justifyContent="space-between">
                        <Flex flexDir="column">
                            <Heading fontSize="lg">Requirements</Heading>
                            <Flex flexWrap="wrap" mt="2" px="3" py="4" alignItems="center" justifyContent="center" border="1px" borderColor="blackAlpha.200" rounded="md" gap="3">
                                {requirements.map((req, index) => <Flex flexDir="column" alignItems="center" justifyContent="center" border="1px" borderColor="blackAlpha.300" rounded="md" p="2.5" key={index} minWidth="100px" cursor="pointer" _hover={{ bgColor: "gray.50" }}>{req.icon}<Text fontSize="md">{req.name}</Text></Flex>)}
                            </Flex>
                        </Flex>
                        <Button mt="3" width="full" colorScheme="blue" rightIcon={<FiChevronsRight />}>Continue</Button>
                    </Flex>
                </Flex>
            </Flex>
            <Divider my="6" />
        </Flex>
    );
}

const Alternatives = () => {
    return (
        <Flex flexDir="column" width="100%" alignItems="start" justifyContent="center" px="10">
            <Divider my="6" />
        </Flex>
    );
}

const Bookings = () => {
    return (
        <Flex width="100%" flexDir="column">
            <Navbar />
            <Spacer />
            <Filter />
            <Flex gap="1" alignItems="stretch" mb="4" px="10" mt="6">
                <Heading fontSize="2xl">Potential Match</Heading>
                <Text fontWeight="600">(2)</Text>
            </Flex>
            <Match />
            <Match />
            <Flex gap="1" alignItems="stretch" mb="4" px="10">
                <Heading fontSize="2xl">Alternatives</Heading>
                <Text fontWeight="600">(2)</Text>
            </Flex>
            <Alternatives />
        </Flex>
    )
}

export default Bookings