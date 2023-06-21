import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"
import { HStack, VStack, Image, Text, FormControl, FormLabel, Button, Flex, Input, Textarea, Spinner } from "@chakra-ui/react"
import Head from "next/head"
import "@fontsource/inter"
import "@fontsource/inter/600.css"
import Link from "next/link"
import { useState } from "react"
import Alert from "@/components/Alert"
import ChatBot from "@/components/ChatBot"
import { useSelector } from "react-redux"
import { useRouter } from "next/router"

const Catering = () => {
    // States
    const [phoneNumber, setPhoneNumber] = useState(null);
    const [description, setDescription] = useState(null);
    const [scheduleTime, setScheduledTime] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const router = useRouter();

    const { token } = useSelector((state) => (state.auth));

    const [alert, setAlert] = useState(null)

    const handleSubmit = (e) => {
        e.preventDefault();
        const selectDate = new Date(scheduleTime);
        const currentDate = new Date();

        const twoDaysFromNow = new Date();
        twoDaysFromNow.setDate(currentDate.getDate() + 2);

        const MonthFromNow = new Date();
        MonthFromNow.setDate(currentDate.getDate() + 30);

        if (selectDate >= twoDaysFromNow && selectDate <= MonthFromNow) {
            const phoneRegex = /^\d{10}$/;
            const cleanPhoneNumber = phoneNumber.replace(/\D/g, '');
            if (phoneRegex.test(cleanPhoneNumber)) {
                postCatering(cleanPhoneNumber, selectDate);
            } else {
                setAlert({ status: "error", title: "Invalid phone number", description: "Please use a valid phone number." })
                setTimeout(() => {
                    setAlert(null);
                }, 4000);
            }
        } else {
            setAlert({ status: "error", title: "Invalid pick up date", description: "Please use a pickup date that is 2-7 days from now." })
            setTimeout(() => {
                setAlert(null);
            }, 4000);
        }
    }

    const postCatering = async (phone, date) => {
        setIsLoading(true);
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/catering/`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ description, phoneNumber: phone, scheduledTime: date }),
            });
            const data = await response.json();
            setIsLoading(false);
            setAlert({ status: data?.message ? "success" : "error", title: data?.message ? "Catering successful" : "Error Occurred.", description: data?.message ? data.message : data.error })
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
                <title>Brulee Patisserie | Catering</title>
                <meta name="description" content="Catering"/>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Navbar/>
            <ChatBot/>
            <VStack height="15vh" width="100vw" bg="#9ED8EA"/>
            <Flex minHeight="85vh" direction={{ base: "column", md: "row" }}>
                <VStack width={{ base: "100vw", md: "50vw" }} minHeight="85vh" bg="white" align="center" justify="center" fontFamily="Inter" spacing="0" paddingX="1rem" overflowX="scroll">
                    <HStack spacing="0" height="20vh" width={{ base: "90vw", sm: "80vw", md: "32rem" }}>
                        <Image
                            fit="contain"
                            height={{ base: "60%", md: "100%" }}
                            src="./catering.png"
                            alt="cateringImage"
                        />
                        <VStack spacing="0" align="start" justify="center">
                            <Text fontWeight="600" fontSize={{ base: "1.1rem", md: "1.25rem" }}>Catering</Text>
                            <Text fontSize={{ base: "0.8rem", md: "0.9rem" }} width={{ base: "70%", md: "100%" }} display={{ base: "none", sm: "block"}}>
                                Input the necessary information and we will reach out to you about catering!
                            </Text>
                        </VStack>
                    </HStack>
                    <form onSubmit={handleSubmit}>
                        <VStack align="center" justify="start" spacing="1rem" width={{ base: "90vw", sm: "80vw", md: "32rem" }} paddingTop="1rem" paddingBottom="2rem">
                            { alert && <Alert status={alert.status} title={alert.title} description={alert.description} isShown={alert.isShown}/>}
                            { isLoading && <Spinner/> }
                            <FormControl isRequired w="100%" spacing="1rem" align="start">
                                <FormLabel fontWeight="600" fontSize="1rem">
                                    Contact Details
                                </FormLabel>
                                <Input 
                                    fontSize="0.8rem"
                                    type="tel" w="100%" placeholder="Enter phone number" borderRadius="0"
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                />
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel fontWeight="600" fontSize="1rem">Proposed Date & Time</FormLabel>
                                <Input 
                                    fontSize="0.8rem"
                                    type="datetime-local" w="100%" placeholder="Enter subject" borderRadius="0"
                                    onChange={(e) => setScheduledTime(e.target.value)}
                                />
                            </FormControl>
                            <FormControl isRequired paddingBottom="1rem">
                                <FormLabel fontWeight="600" fontSize="1rem">Description</FormLabel>
                                <Textarea 
                                    fontSize="0.8rem"
                                    type="text" w="100%" minHeight="4rem" 
                                    placeholder="Enter short description of your catering requirements and useful information for us." borderRadius="0"
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </FormControl>
                            <Button padding="0.5rem 1rem" bg="#A5551B" color="white" _hover={{ bg: "#E07324" }} fontWeight="600" borderRadius="0" type="submit">
                                Submit
                            </Button>
                        </VStack>   
                    </form>
                </VStack>
                <VStack width={{ base: "100vw", md: "50vw" }} align="center" justify="center" minHeight="85vh" bg="#CF9249" padding="1rem">
                    <Image fit="contain" height="90%" borderRadius="1rem" alt="cateringMenu" src="./website-catering.jpg"/>
                </VStack>
            </Flex>
            <Footer/>
        </>
    )
}

export default Catering