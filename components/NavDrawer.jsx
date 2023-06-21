import { HStack, Text, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, Button, VStack, Show, useDisclosure, Container } from "@chakra-ui/react"
import { GoThreeBars } from "react-icons/go"

// Fonts
import "@fontsource/inter"
import "@fontsource/inter/600.css"
import Link from "next/link";


const NavDrawer = () => {
    const {onOpen, isOpen, onClose} = useDisclosure();
    return (
        <>
            <Container _hover={{ cursor: "pointer" }}>
                <GoThreeBars onClick={onOpen}/>
            </Container>
            <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="md">
                <DrawerOverlay>
                <DrawerContent size="lg" bg="#CF9249">
                    <HStack width="100%" justify="end" padding="1rem">
                        <DrawerCloseButton color="white"/>
                    </HStack>
                    <DrawerBody as={VStack} spacing="2rem" padding="1rem" color="white" bg="#CF9249">
                        <Link href="/store"><Text _hover={{ textDecor: "underline"}}>Store</Text></Link>
                        <Link href="/catering"><Text _hover={{ textDecor: "underline"}}>Catering</Text></Link>
                        <Link href="/faq"><Text _hover={{ textDecor: "underline"}}>FAQ</Text></Link>
                        <Link href="/contact-us"><Text _hover={{ textDecor: "underline"}}>Contact Us</Text></Link>
                    </DrawerBody>
                </DrawerContent>
                </DrawerOverlay>
            </Drawer>
        </>
    )
}

export default NavDrawer