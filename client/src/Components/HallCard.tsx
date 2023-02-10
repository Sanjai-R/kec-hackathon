import React, { useState } from 'react'

import { IoMicOutline } from 'react-icons/io5'
import { RiWindyLine, RiProjector2Line } from 'react-icons/ri'
import { TbBottle } from 'react-icons/tb'
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi'
import { FiChevronsRight, FiSpeaker } from 'react-icons/fi'
import { AiOutlineThunderbolt } from 'react-icons/ai'
import { Badge, Button, Divider, Flex, Heading, IconButton, Image, Switch, Text } from '@chakra-ui/react'

const sizeOfIcon = 20;

const HallCard = () => {
    const requirements = [
        { name: 'Water', icon: <TbBottle size={sizeOfIcon} /> },
        { name: 'Mic', icon: <IoMicOutline size={sizeOfIcon} /> },
        { name: 'Projector', icon: <RiProjector2Line size={sizeOfIcon} /> },
        { name: 'Speaker', icon: <FiSpeaker size={sizeOfIcon} /> },
        { name: 'AC', icon: <RiWindyLine size={sizeOfIcon} /> },
        { name: 'Generator', icon: <AiOutlineThunderbolt size={sizeOfIcon} /> },
    ]

    const [isFullDay, setIsFullDay] = useState(false)

    return (
        <Flex flexDir="column" width="100%" alignItems="start" justifyContent="center" px="4">
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

export default HallCard;