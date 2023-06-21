import { HStack, Text, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, VStack, Show, useDisclosure, CloseButton, Image, DrawerFooter, Container } from "@chakra-ui/react"
import { BsPersonCircle } from "react-icons/bs"
import Button from "./Button"
// Fonts
import "@fontsource/inter"
import "@fontsource/inter/600.css"
import "@fontsource/eb-garamond"
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux"
import { logout } from "@/redux/auth/authReducer"
import OrdersPopUp from "./Order/OrdersPopUp"
import CateringPopUp from "./Catering/CateringPopUp"
import QueryPopUp from "./Query/QueryPopUp"


const UserDrawer = () => {
    const {onOpen, isOpen, onClose} = useDisclosure();
    const { user, token } = useSelector((state) => (state.auth));
    const dispatch = useDispatch();
    return (
        <>
            <Container _hover={{ cursor: "pointer" }}>
                <BsPersonCircle onClick={onOpen}/>
            </Container>   
            <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="md">
                <DrawerOverlay>
                <DrawerContent size="lg" bg="#CF9249" fontFamily="Inter">
                    <HStack width="100%" padding="1rem" justify="space-between" align="center" bg="#9ED8EA" color="white">
                        {   user ? 
                            <VStack align="start" padding="1rem" spacing="0">
                                <Text fontSize="1.5rem" fontWeight="600"><i>Hey, </i>{user.name}!</Text>
                                { user?.isAdmin && <Text fontSize="0.75rem" textDecor="underline">Admin Mode</Text> }
                            </VStack>
                             : 
                            <Text fontSize="1.5rem" padding="1rem" fontWeight="600">User Details</Text>
                        }
                        <CloseButton onClick={onClose}/>
                    </HStack>
                    { user ? (
                        <DrawerBody as={VStack} spacing="2rem" paddingTop="3rem" padding="1rem" color="black" bg="white" align="center">
                            <HStack width="100%" justify="space-between" padding="1rem" align="center">
                                <VStack align="start" spacing="0">
                                    <Text fontWeight="600" fontSize="1.25rem">Orders</Text>
                                    <OrdersPopUp/>
                                </VStack>
                                <Image fit="contain" src="/orders.png" width="20%"/>
                            </HStack>
                            <HStack width="100%" justify="space-between" padding="1rem" align="center">
                                <VStack align="start" spacing="0">
                                    <Text fontWeight="600" fontSize="1.25rem">Catering</Text>
                                    <CateringPopUp/>
                                </VStack>
                                <Image fit="contain" src="/catering-2.png" width="20%"/>
                            </HStack>
                            <HStack width="100%" justify="space-between" padding="1rem" align="center">
                                <VStack align="start" spacing="0">
                                    <Text fontWeight="600" fontSize="1.25rem">Queries</Text>
                                    <QueryPopUp/>
                                </VStack>
                                <Image fit="contain" src="/query.png" width="20%"/>
                            </HStack>
                        </DrawerBody>
                    ) :
                    (
                        <DrawerBody as={VStack} spacing="2rem" paddingTop="3rem" padding="1rem" color="black" bg="white" align="center">
                            <Image src="./oops.svg" alt="Error" height="10vh" id="error-img"/>
                            <Text width="50%" textAlign="center" fontWeight="400">To get access to your details, please sign in or register!</Text>
                            <HStack justify="center" spacing="2rem" fontFamily="EB Garamond">
                                <Button link="/login" content="Log In" main="true"/>
                                <Button link="/register" content="Register"/>
                            </HStack>
                        </DrawerBody>
                    )
                    }
                    <DrawerFooter>
                        { user && <Button content="Log Out" href="/" main="true" onClick={() => dispatch(logout())}/> }
                    </DrawerFooter>
                </DrawerContent>
                </DrawerOverlay>
            </Drawer>
        </>
    )
}

export default UserDrawer