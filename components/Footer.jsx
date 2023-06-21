import { HStack, VStack, Text, Image } from "@chakra-ui/react"
import Link from "next/link"

const Footer = () => {
    return (
        <HStack width="100vw" bgColor="#55514F" justifyContent="space-between" paddingX="1rem">
            <VStack align="start" padding="2rem" color="#FFFCF9" fontSize={{ base: "0.8rem", md: "1rem"}}>
                <Text>Home</Text>
                <Link href="/store"><Text _hover={{ textDecor: "underline"}}>Store</Text></Link>
                <Link href="/faq"><Text _hover={{ textDecor: "underline"}}>FAQ</Text></Link>
                <Link href="/catering"><Text _hover={{ textDecor: "underline"}}>Catering</Text></Link>
                <Link href="/contact-us"><Text _hover={{ textDecor: "underline"}}>Contact Us</Text></Link>
            </VStack>
            <Link href="/">
                <Image 
                src="./brulee_logo.png"
                alt="Logo"
                fit="contain"
                height={{ base: "5vh", md: "10vh"}}
            />
            </Link>
            
        </HStack>
    )
}

export default Footer