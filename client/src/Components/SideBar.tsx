import { Divider, Flex, Heading, Spacer, Text, VStack } from "@chakra-ui/react";
import { RiWalkLine } from "react-icons/ri";
import { MdOutlineDashboard, MdOutlineBookmarkAdd, MdOutlineHistory } from "react-icons/md";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { loadingAtom, userAtom } from "../state/atom";
import Lottie from 'react-lottie-player'
import lottieFile from "../assets/lottie.json"

const sizeOfIcon = 25

const SideBar = () => {
    const usernavItems = [
        { title: "History", icon: <MdOutlineHistory size={sizeOfIcon} />, loc: '/history' },
        { title: "Bookings", icon: <MdOutlineBookmarkAdd size={sizeOfIcon} />, loc: '/bookings' },
    ];
    const sAdminItems = [
        { title: "Dashboard", icon: <MdOutlineDashboard size={sizeOfIcon} />, loc: '/' },
    ]
    const location = useLocation();
    const navigate = useNavigate();

    const [loading, setLoading] = useRecoilState(loadingAtom)
    const [user, setUserState] = useRecoilState(userAtom)

    return (
        <Flex height="100vh" width="100%">
            <Flex bg="#282626" width="18%" overflowY="hidden">
                <VStack align="flex-start" h="100%" justify="space-between" width="100%">
                    <VStack align="flex-start" pt="20%" width="100%">
                        <Flex flexDir="column" width="100%" alignItems="center" color="white">
                            <Heading fontSize="4xl">KHB</Heading>
                            <Text fontSize="md">KEC Hall Booking</Text>
                            <Spacer mb="8" />
                            <Divider width="80%" borderColor="gray" />
                            <Spacer mb="10" />
                            <Flex flexDir="column" width="100%" alignItems="start" pl='10' gap='5'>
                                {user.role.collection === 'user' ? usernavItems.map((item, index) => {
                                    return <Flex key={index} flexDir="row" alignItems="center" justifyContent="center" gap="3" color={location.pathname === item.loc ? "white" : "whiteAlpha.700"} _hover={{ color: "white" }} cursor="pointer" onClick={() => navigate(item.loc)}>{item.icon} <Text fontSize="lg">{item.title}</Text></Flex>
                                }) : user.role.collection === 's-admin' ? sAdminItems.map((item, index) => {
                                    return <Flex key={index} flexDir="row" alignItems="center" justifyContent="center" gap="3" color={location.pathname === item.loc ? "white" : "whiteAlpha.700"} _hover={{ color: "white" }} cursor="pointer" onClick={() => navigate(item.loc)}>{item.icon} <Text fontSize="lg">{item.title}</Text></Flex>
                                }) : ''}
                            </Flex>
                        </Flex>
                    </VStack>
                    <VStack align="flex-start" pb="15%" width="100%">
                        <Flex flexDir="column" width="100%" alignItems="center" color="white">
                            <Divider width="80%" mb="8" borderColor="gray" />
                            <Flex flexDir="column" width="100%" alignItems="start" pl='10' gap='5'>
                                <Flex flexDir="row" alignItems="center" justifyContent="center" gap="3" cursor="pointer" onClick={() => {
                                    localStorage.setItem('email', '');
                                    setUserState({
                                        name: '',
                                        email: '',
                                        contact: '',
                                        role: {
                                            type: '',
                                            collection: '',
                                        },
                                        _id: '',
                                    })
                                    navigate('/authenticate')
                                }}>
                                    <RiWalkLine size={sizeOfIcon} style={{ transform: 'scaleX(-1)' }} />
                                    <Text fontSize="lg">Exit</Text>
                                </Flex>
                            </Flex>
                        </Flex>
                    </VStack>
                </VStack>
            </Flex>
            <Flex overflowY={loading ? "hidden" : "scroll"} width="82%" position="relative">
                <Flex width="100%" height="100%" position="absolute" backdropFilter="blur(10px) " display={!loading ? "none" : "inherit"} zIndex="999" alignItems="center" justifyContent="center" flexDir="column">
                    <Lottie
                        loop
                        animationData={lottieFile}
                        play
                        style={{ width: 150, height: 150 }}
                    />
                </Flex>
                <Outlet />
            </Flex>
        </Flex>
    );
};

export default SideBar;