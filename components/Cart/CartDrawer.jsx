import { HStack, Text, Drawer, DrawerOverlay, DrawerContent, DrawerBody, VStack, useDisclosure, CloseButton, Image, DrawerFooter, Container } from "@chakra-ui/react"
import { BsFillCartFill } from "react-icons/bs"
import Button from "../Button"
import CartItem from "./CartItem"

// Fonts
import "@fontsource/inter"
import "@fontsource/inter/600.css"
import "@fontsource/eb-garamond"
import Link from "next/link";

import "./CartItem"
import { useDispatch, useSelector } from "react-redux"
import { deleteCart } from "@/redux/cartReducer"


const CartDrawer = () => {
    const {onOpen, isOpen, onClose} = useDisclosure();
    const { user } = useSelector((state) => (state.auth));
    const items = useSelector((state) => (state.cart.items));
    const dispatch = useDispatch();
    return (
        <>
            <HStack _hover={{ cursor: "pointer" }} position="relative" onClick={onOpen}>
                <BsFillCartFill/>
                { items?.length > 0 && <Text bg="red.500" fontSize="1rem" borderRadius="25%" padding="0.25rem 0.5rem" top="1rem">
                    <b>{items.reduce((total, item) => total + item.quantity, 0)}</b>
                </Text> }
            </HStack>
            <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="md">
                <DrawerOverlay>
                <DrawerContent size="lg" bg="#CF9249" fontFamily="Inter">
                    <HStack width="100%" padding="1rem" justify="space-between" align="center" bg="#9ED8EA" color="white">
                        <VStack align="start" padding="1rem" spacing="0">
                            <Text fontSize="1.5rem" fontWeight="600">Basket</Text>
                            <Text fontSize="1rem" textDecor="underline">
                                <i>Shopping Cart</i>
                            </Text>
                        </VStack>
                        <CloseButton onClick={onClose}/>
                    </HStack>
                    { user ? (
                        <DrawerBody as={VStack} spacing="1rem" paddingTop="3rem" padding="1rem" color="black" bg="white" align="center">
                            {
                                items?.length > 0 ? 
                                    items.map((item) => <CartItem key={item.id} item={item}/>)
                                : (
                                    <VStack>
                                        <Image src="./oops.svg" alt="Error" height="10vh" id="error-img"/>
                                        <Text textAlign="center" fontWeight="400">No Items in Cart Currently</Text>
                                    </VStack>
                                )                                
                            }
                        </DrawerBody>
                    ) :
                    (
                        <DrawerBody as={VStack} spacing="2rem" paddingTop="3rem" padding="1rem" color="black" bg="white" align="center">
                            <Image src="./oops.svg" alt="Error" height="10vh" id="error-img"/>
                            <Text width="50%" textAlign="center" fontWeight="400">To access your cart items, please sign in or register!</Text>
                            <HStack justify="center" spacing="2rem" fontFamily="EB Garamond">
                                <Button link="/login" content="Log In" main="true"/>
                                <Button link="/register" content="Register"/>
                            </HStack>
                        </DrawerBody>
                    )
                    }
                    <DrawerFooter as={HStack} spacing="0.5rem">
                        { user && items?.length > 0 && <Button content="Continue to Checkout" link="/checkout" main="true"/> }
                        { user && items?.length > 0 && <Button content="Remove All From Cart" link="/" main="true" onClick={() => dispatch(deleteCart())}/> }
                    </DrawerFooter>
                </DrawerContent>
                </DrawerOverlay>
            </Drawer>
        </>
    )
}

export default CartDrawer