import { Button, Flex, Grid, GridItem, Heading, Image, Spacer, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { RiWalkLine } from "react-icons/ri";
import { MdOutlineDashboard, MdOutlineBookmarkAdd, MdOutlineHistory } from "react-icons/md";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const sizeOfIcon = 30

const SideBar = () => {
    const navItems = [
        { title: "Dashboard", icon: <MdOutlineDashboard size={sizeOfIcon} />, loc: '/' },
        { title: "Bookings", icon: <MdOutlineBookmarkAdd size={sizeOfIcon} />, loc: '/bookings' },
        { title: "History", icon: <MdOutlineHistory size={sizeOfIcon} />, loc: '/history' },
    ];
    const location = useLocation();
    const navigate = useNavigate();

    return (
        <Grid height="100vh" templateColumns="repeat(6, 1fr)">
            <GridItem colSpan={1} bg="#282626">
                <VStack align="flex-start" h="100%" justify="space-between" width="100%">
                    <VStack align="flex-start" pt="20%" width="100%">
                        <Flex flexDir="column" width="100%" alignItems="center" color="white">
                            <Heading>KHB</Heading>
                            <Text fontSize="lg">KEC Hall Booking</Text>
                            <Spacer mb="12" />
                            <Flex flexDir="column" width="100%" alignItems="start" pl='10' gap='4'>
                                {navItems.map((item, index) => {
                                    return <Flex key={index} flexDir="row" alignItems="center" justifyContent="center" gap="3" color={location.pathname === item.loc ? "white" : "whiteAlpha.700"} _hover={{ color: "white" }} cursor="pointer" onClick={() => navigate(item.loc)}>{item.icon} <Text fontSize="xl">{item.title}</Text></Flex>
                                })}
                            </Flex>
                        </Flex>
                    </VStack>
                    <VStack align="flex-start" pb="25%" width="100%">
                        <Flex flexDir="column" width="100%" alignItems="start" pl='10' gap='4' color="white">
                            <Flex flexDir="row" alignItems="center" justifyContent="center" gap="3" >
                                <RiWalkLine size={sizeOfIcon} style={{ transform: 'scaleX(-1)' }} />
                                <Text fontSize="xl">Exit</Text>
                            </Flex>
                        </Flex>
                    </VStack>
                </VStack>
            </GridItem>
            <GridItem colSpan={5}>
                <Outlet />
            </GridItem>
        </Grid>
    );
};

export default SideBar;