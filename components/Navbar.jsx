import { HStack, Image } from "@chakra-ui/react"

// Fonts
import "@fontsource/inter"
import "@fontsource/inter/600.css"
import Link from "next/link";
import NavDrawer from "./NavDrawer";
import UserDrawer from "./UserDrawer";
import CartDrawer from "./Cart/CartDrawer";


const Navbar = () => {
    return (
        <HStack fontFamily="inter" justify="space-between" width="100vw" height="15vh" padding="2rem" bg="none" color="white" position="absolute" zIndex={99}>
            <Link href="/"><Image src="/brulee_logo.png" alt="Logo" objectFit="contain" height="10vh" _hover={{ cursor: "pointer" }}/></Link>
            <HStack fontSize={{ base: "1rem", md: "1.25rem" }} spacing={{ base: "1rem", md: "2rem" }}>
                <UserDrawer/>
                <CartDrawer/>
                <NavDrawer/>         
            </HStack>
        </HStack>
    )
}

export default Navbar