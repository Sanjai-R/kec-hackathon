import React, { Dispatch, ReactNode, SetStateAction, useEffect, useState } from 'react'

import { IoMicOutline } from 'react-icons/io5'
import { RiWindyLine, RiProjector2Line } from 'react-icons/ri'
import { TbBottle } from 'react-icons/tb'
import { FiChevronsRight, FiSpeaker } from 'react-icons/fi'
import { AiOutlineThunderbolt } from 'react-icons/ai'
import { Badge, Button, Divider, Flex, Heading, IconButton, Image, Switch, Text } from '@chakra-ui/react'
import { imgs } from '../utils/imageStrings'

const sizeOfIcon = 20;

interface Props {
    isSingleDayEvent: string,
    dateArr: string[],
    water: boolean,
    mic: boolean,
    projector: boolean,
    speaker: boolean,
    ac: boolean,
    generator: boolean,
    setWater: Dispatch<SetStateAction<boolean>>,
    setMic: Dispatch<SetStateAction<boolean>>,
    setProjector: Dispatch<SetStateAction<boolean>>,
    setSpeaker: Dispatch<SetStateAction<boolean>>,
    setAC: Dispatch<SetStateAction<boolean>>,
    setGenerator: Dispatch<SetStateAction<boolean>>,
    selectedPeriods: any,
    setSelectedPeriods: Dispatch<SetStateAction<any>>,
    isFullDay: boolean,
    setIsFullDay: Dispatch<SetStateAction<boolean>>,
    result: any
}

type reqType = {
    name: string;
    icon: ReactNode;
}

const HallCard = ({ isSingleDayEvent, water, mic, projector, speaker, ac, generator, setWater, setMic, setProjector, setSpeaker, setAC, setGenerator, selectedPeriods, setSelectedPeriods, dateArr, isFullDay, setIsFullDay, result }: Props) => {
    const requirements: reqType[] = [
        { name: 'Water', icon: <TbBottle size={sizeOfIcon} /> },
        { name: 'Mic', icon: <IoMicOutline size={sizeOfIcon} /> },
        { name: 'Projector', icon: <RiProjector2Line size={sizeOfIcon} /> },
        { name: 'Speaker', icon: <FiSpeaker size={sizeOfIcon} /> },
        { name: 'AC', icon: <RiWindyLine size={sizeOfIcon} /> },
        { name: 'Generator', icon: <AiOutlineThunderbolt size={sizeOfIcon} /> },
    ]

    const checkCurrentReq = (index: number) => {
        if (index === 0) {
            return water
        }
        if (index === 1) {
            return mic
        }
        if (index === 2) {
            return projector
        }
        if (index === 3) {
            return speaker
        }
        if (index === 4) {
            return ac
        }
        if (index === 5) {
            return generator
        }
    }

    const chooseReq = (index: number) => {
        if (index === 0) {
            setWater(!water)
        }
        if (index === 1) {
            setMic(!mic)
        }
        if (index === 2) {
            setProjector(!projector)
        }
        if (index === 3) {
            setSpeaker(!speaker)
        }
        if (index === 4) {
            setAC(!ac)
        }
        if (index === 5) {
            setGenerator(!generator)
        }
    }

    return (
        <Flex flexDir="column" width="100%" alignItems="start" justifyContent="center" px="4">
            <Flex width="100%" flexDir="column" alignItems="center" justifyContent="center">
                <Flex width="100%" justifyContent="center" gap="6">
                    <Image src={imgs[result.name]} width="30%" rounded="lg" />
                    <Flex flexDir="column" width="30%" gap="2">
                        <Heading fontSize="lg">{result.name}</Heading>
                        <Flex alignItems="center" gap="3">
                            <Badge colorScheme="green">Available</Badge>
                            <Text><b>Capacity:</b> {result.capacity}</Text>
                        </Flex>
                        <Text><b>Incharge:</b> {result.incharge.name} ({result.incharge.contact})</Text>
                        <Divider />
                        {isSingleDayEvent !== '1' ?
                            <Flex flexDir="column">
                                <Text><b>From: </b>{dateArr[0]}</Text>
                                <Text><b>From: </b>{dateArr[dateArr.length - 1]}</Text>
                            </Flex>
                            :
                            <Flex flexDir="column">
                                <Flex alignItems="center" gap="3" mt="2">
                                    <Text fontWeight="600">Full Day</Text>
                                    <Switch size='md' isChecked={isFullDay} onChange={() => setIsFullDay(!isFullDay)} />
                                </Flex>
                                {!isFullDay ? <>
                                    <Text fontWeight="600">Periods:</Text>
                                    <Flex flexWrap="wrap" alignItems="center" gap="2">
                                        {Array.from(Array(7).keys()).map((req, index) => <Flex border="1px" borderColor="blackAlpha.300" rounded="md" alignItems="center" justifyContent="center" key={index} px="3.5" py="2" cursor="pointer"
                                            color={selectedPeriods.includes(req + 1) ? 'white' : ""}
                                            bgColor={selectedPeriods.includes(req + 1) ? 'green.400' : ""} _hover={{ bgColor: selectedPeriods.includes(req + 1) ? '' : "gray.50" }}
                                            onClick={() => {
                                                let s = selectedPeriods;
                                                if (s.includes(req + 1)) {
                                                    s = s.filter((val: any) => {
                                                        if (val !== req + 1) return val
                                                    })
                                                    setSelectedPeriods(s)
                                                } else {
                                                    setSelectedPeriods((prev: any) => [...prev, req + 1])
                                                }

                                            }}>{req + 1}</Flex>)}
                                    </Flex>
                                </> : ''}
                            </Flex>
                        }
                    </Flex>
                    <Flex width="32%" flexDir="column" justifyContent="space-between">
                        <Flex flexDir="column">
                            <Heading fontSize="lg">Requirements</Heading>
                            <Flex flexWrap="wrap" mt="2" px="3" py="4" alignItems="center" justifyContent="center" border="1px" borderColor="blackAlpha.200" rounded="md" gap="3">
                                {requirements.map((req, index) => <Flex flexDir="column" alignItems="center" justifyContent="center" border="1px" borderColor="blackAlpha.300" rounded="md" p="2.5" key={index} minWidth="100px" color={checkCurrentReq(index) ? 'white' : ''} cursor="pointer" _hover={{ bgColor: checkCurrentReq(index) ? '' : "gray.50" }}
                                    backgroundColor={checkCurrentReq(index) ? 'green.400' : 'white'} onClick={() => chooseReq(index)}>{req.icon}<Text fontSize="md"
                                    >{req.name}</Text></Flex>)}
                            </Flex>
                        </Flex>
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    );
}

export default HallCard;