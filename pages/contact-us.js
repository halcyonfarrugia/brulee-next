import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"
import { HStack, VStack, Image, Text, FormControl, FormLabel, Button, Flex, Input, Textarea, Spinner } from "@chakra-ui/react"
import Head from "next/head"
import "@fontsource/inter"
import "@fontsource/inter/600.css"
import Link from "next/link"
import { useState } from "react"
import Alert from "@/components/Alert"
import { useRouter } from "next/router"

const ContactUs = () => {
    // States
    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [email, setEmail] = useState(null);
    const [phoneNumber, setPhoneNumber] = useState(null);
    const [subject, setSubject] = useState(null);
    const [description, setDescription] = useState(null);
    const [isLoading, setIsLoading] = useState(null);

    const [alert, setAlert] = useState(null)
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!(firstName && lastName && email && phoneNumber && subject && description)) return;
        const phoneRegex = /^\d{10}$/;
        const cleanPhoneNumber = phoneNumber.replace(/\D/g, '');
        if (!(phoneRegex.test(cleanPhoneNumber))) {
            setAlert({ status: "error", title: "Invalid phone number", description: "Please use a valid phone number." })
            setTimeout(() => {
                setAlert(null);
            }, 4000);
            return;
        }
        setIsLoading(true);
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/query/`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ firstName, lastName, email, phoneNumber: cleanPhoneNumber, subject, description }),
            });
            const data = await response.json();
            setIsLoading(false);
            setAlert({ status: data?.message ? "success" : "error", title: data?.message ? "Query sent successfully" : "Error Occurred.", description: data?.message ? data.message : data.error })
            setTimeout(() => {
                if (data?.message) {
                    router.push('/');
                }
                setAlert(null);
            }, 3000);
        } catch (error) {
            setIsLoading(false);
            setAlert({ status: "error", title: "Error Occurred.", description: "Could not reach server. Please try again later." })
            setTimeout(() => {
                setAlert(null);
            }, 3000);
        }
    }
    return (
        <>
            <Head>
                <title>Brulee Patisserie | Contact Us</title>
                <meta name="description" content="Contact Us" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Navbar/>
            <VStack height="15vh" width="100vw" bg="#9ED8EA"/>
            <VStack width="100vw" minHeight="85vh" bg="white" align="center" justify="center" fontFamily="Inter" spacing="0">
                <HStack spacing="0" height="20vh" width={{ base: "90vw", sm: "80vw", md: "32rem" }}>
                    <Image
                        fit="contain"
                        height="100%"
                        src="./phone.png"
                        alt="phoneImage"
                    />
                    <VStack spacing="0" align="start" justify="center">
                        <Text fontWeight="600" fontSize={{ base: "1.1rem", md: "1.25rem" }}>Contact Us</Text>
                        <Text fontSize={{ base: "0.8rem", md: "0.9rem" }} width={{ base: "70%", md: "100%" }} display={{ base: "none", sm: "block"}}>
                            Let us know what you have in mind and we will be sure to reply in no time!
                        </Text>
                    </VStack>
                </HStack>
                <form onSubmit={handleSubmit}>
                    <VStack align="center" justify="start" spacing="1rem" width={{ base: "90vw", sm: "80vw", md: "32rem" }} paddingTop="1rem" paddingBottom="2rem">
                        { isLoading && <Spinner/> }
                        { alert && <Alert status={alert.status} title={alert.title} description={alert.description} isShown={alert.isShown}/>}
                        <FormControl isRequired w="100%" spacing="1rem" align="start">
                            <FormLabel fontWeight="600" fontSize="1rem">
                                Contact Details
                            </FormLabel>
                            <VStack w="100%" align="start" spacing="1rem">
                                <Flex direction={{ base: "column", md: "row"}} w="100%">
                                    <Input 
                                        fontSize="0.8rem"
                                        marginRight="1rem"
                                        placeholder="Enter first name"
                                        w={{ base: "100%", md: "50%" }}
                                        borderRadius="0"
                                        onChange={(e) => setFirstName(e.target.value)}
                                    />
                                    <Input
                                        fontSize="0.8rem"
                                        marginTop={{ base: "1rem", md: 0 }}
                                        placeholder="Enter last name"
                                        w={{ base: "100%", md: "50%" }}
                                        borderRadius="0"
                                        onChange={(e) => setLastName(e.target.value)}
                                    />
                                </Flex>
                                <Input 
                                    fontSize="0.8rem"
                                    type="email" w="100%" placeholder="Enter email address" borderRadius="0"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <Input 
                                    fontSize="0.8rem"
                                    type="tel" w="100%" placeholder="Enter phone number" borderRadius="0"
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                />
                            </VStack>
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel fontWeight="600" fontSize="1rem">Subject</FormLabel>
                            <Input 
                                fontSize="0.8rem"
                                type="text" w="100%" placeholder="Enter subject" borderRadius="0"
                                onChange={(e) => setSubject(e.target.value)}
                            />
                        </FormControl>
                        <FormControl isRequired paddingBottom="1rem">
                            <FormLabel fontWeight="600" fontSize="1rem">Description</FormLabel>
                            <Textarea 
                                fontSize="0.8rem"
                                type="text" w="100%" minHeight="4rem" 
                                placeholder="Type your message here...." borderRadius="0"
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </FormControl>
                        <Button padding="0.5rem 1rem" bg="#A5551B" color="white" _hover={{ bg: "#E07324" }} fontWeight="600" borderRadius="0" type="submit">
                            Submit
                        </Button>
                    </VStack>   
                </form>
            </VStack>
            <Footer/>
        </>
    )
}

export default ContactUs