import { Button, Divider, Flex, FormControl, FormLabel, Heading, Highlight, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spacer, Text, Textarea, useDisclosure, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar'
import { DateRange } from 'react-day-picker'
import 'react-day-picker/dist/style.css';
import HallCard from '../Components/HallCard';
import FilterSection from '../Components/FilterSection';
import { useRecoilState, useRecoilValue } from 'recoil';
import { loadingAtom, userAtom } from '../state/atom';
import axios from 'axios';
import { baseURL, booking, createEvent, getClub, singleFilter } from '../utils/connection';
import { errToast, infoToast, successToast } from '../Components/Toast';
import { FiChevronsDown, FiChevronsRight } from 'react-icons/fi';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

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
    const { isOpen, onOpen, onClose } = useDisclosure()
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

    const [selectedPeriods, setSelectedPeriods] = useState<any>([])

    const [capacity, setCapacity] = useState(30);
    const [hall, setHall] = useState('Classroom')
    const [eventName, setEventName] = useState('')


    const [needToFactor, setNeedToFactor] = useState(false)
    const [verificationDesc, setVerificationDesc] = useState('');
    const [icnf, setICNF] = useState('')
    const [confirmed, setConfirmed] = useState(false)

    const confirmation = () => {
        if (verificationDesc === '') {
            errToast(toast, 'Description missing', 'Need a description to continue')
            return
        }
        if (icnf !== 'I confirm') {
            errToast(toast, 'Type I confirm', 'Confirm to continue further')
            return
        }
        setNeedToFactor(false)
        setConfirmed(true)
        onClose()
    }

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

    const [results, setResults] = useState<any>([]);
    const [isFullDay, setIsFullDay] = useState(true)

    const filterConnection = async () => {
        setNeedToFactor(false)
        setConfirmed(false)
        if (eventName === '') {
            errToast(toast, 'Event name missing', 'Enter a event name to filter')
            return
        }
        if (selectedClub === undefined) {
            errToast(toast, 'Club missing', 'Select a club to filter')
            return
        }
        if (selectedDate === undefined) {
            errToast(toast, 'Date missing', 'Select a date to filter')
            return
        }
        if (isSingleDayEvent === '1') {
            console.log(capacity, hall)
            const response = await axios.get(baseURL + singleFilter, {
                params: {
                    capacity: capacity,
                    type: hall,
                    date: moment(selectedDate).format('YYYY-MM-DD')
                }
            })
            setResults(response.data.data)
        }
    }

    const [loading, setLoading] = useRecoilState(loadingAtom)
    const navigate = useNavigate()

    const bookConnection = async (requested_hall: any) => {
        setLoading(true)
        const requirements = []
        if (water) requirements.push('Water')
        if (mic) requirements.push('Mic')
        if (projector) requirements.push('Projector')
        if (speaker) requirements.push('Speaker')
        if (ac) requirements.push('AC')
        if (generator) requirements.push('Generator')
        const response = await axios.post(baseURL + createEvent, {
            name: eventName,
            staff_incharge: selectedClub?.faculty_coordinator,
            club: selectedClub?._id,
            requirements: requirements,
            event_capacity: capacity,
        });
        if (response.data.status) {
            const response2 = await axios.post(baseURL + booking, {
                event: response.data.data._id,
                requested_by: selectedClub?.faculty_coordinator,
                requested_hall: requested_hall,
                schedule: {
                    date: moment(selectedDate).format('YYYY-MM-D'),
                    period: isFullDay ? [1, 2, 3, 4, 5, 6, 7] : selectedPeriods,
                },
                requested_hall_type: hall,
                type: 'single'
            })
            if (response2.data.status) {
                successToast(toast, 'Pending approval', 'Your booking has been successful. Please wait till approved')
                setLoading(false)
                navigate('/')
            } else {
                errToast(toast, 'Some error occurred', 'Some error occurred in the server please try again after some time')
                setLoading(false)
            }
        } else {
            setLoading(false)
            errToast(toast, 'Some error occurred', 'Some error occurred in the server please try again after some time')
        }
    }

    const book = (requested_hall: any) => {
        validationOfCapacity()
        if (needToFactor === true) {
            if (confirmed === true) {
                bookConnection(requested_hall)
            } else {
                errToast(toast, 'Confirm', 'Please confirm to continue')
            }
        } else {
            bookConnection(requested_hall)
        }
    }

    useEffect(() => {
        fetchClubs()
    }, []);

    const validationOfCapacity = () => {
        const threshold = {
            'Classroom': 30,
            'Laboratory': 10,
            'Seminar Hall': 70,
            'Maharaja Auditorium': 120,
            'Conventional Centre': 500,
        }
        if (confirmed === true) {
            return
        }
        if (threshold[`${hall}`] > capacity) {
            setNeedToFactor(true)
            onOpen()
        }
    }

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
        <Flex width="100%" flexDir="column" mb="10">
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
                capacity={capacity}
                hall={hall}
                setCapacity={setCapacity}
                setHall={setHall}
                eventName={eventName}
                setEventName={setEventName}
            />
            <Flex alignItems="center" justifyContent="center">
                <Button rightIcon={<FiChevronsDown />} leftIcon={<FiChevronsDown />} colorScheme="blue" mt="3" width="md" fontSize="lg" onClick={() => {
                    filterConnection()
                }}>Filter Halls</Button>
            </Flex>
            <Divider mt="6" />
            <Flex gap="1" alignItems="stretch" mb="4" px="10" mt="6">
                <Heading fontSize="2xl">Available</Heading>
                <Text fontWeight="600">({results.length})</Text>
            </Flex>
            {results.length > 0 ?
                <Flex flexDir="column" width="100%">
                    {results.map((result: any, index: number) => <Flex flexDir='column'>
                        <HallCard
                            isSingleDayEvent={isSingleDayEvent}
                            dateArr={dateArr}
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
                            isFullDay={isFullDay}
                            setIsFullDay={setIsFullDay}
                            key={index}
                            result={result}
                        />
                        <Flex width="100%" justifyContent="end" px="8">
                            <Button mt="3" width="sm" colorScheme="blue" rightIcon={<FiChevronsRight />} onClick={() => {
                                book(result._id)
                            }}>Continue</Button>
                        </Flex>
                        <Divider my="6" />
                    </Flex>)}
                </Flex>
                :
                <Flex justifyContent="center">
                    <Heading fontSize="2xl" color="gray">No halls avaialble</Heading>
                </Flex>}
            <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false} size="lg" isCentered >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Secondary verification</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Text>For a small capacity of event attendees you are requesting a large hall which might be a lot for this event. If you still wish to continue with this selection, fill the details below</Text>
                        <FormControl isRequired mt="5">
                            <FormLabel>Why you are requesting this hall</FormLabel>
                            <Textarea value={verificationDesc} onChange={(e) => setVerificationDesc(e.target.value)} />
                        </FormControl>
                        <FormControl isRequired mt="3">
                            <FormLabel><Highlight query='I confirm' styles={{ px: '1', py: '1', bg: 'orange.100' }}>Type I confirm</Highlight></FormLabel>
                            <Input value={icnf} onChange={(e) => setICNF(e.target.value)} />
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='red' mr={3} onClick={confirmation}>
                            Continue
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Flex>
    )
}

export default Bookings