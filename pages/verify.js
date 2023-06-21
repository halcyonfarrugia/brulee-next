import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"
import { HStack, VStack, Image, Text, FormControl, FormLabel, Flex, Input, FormHelperText, Spinner } from "@chakra-ui/react"
import Head from "next/head"
import "@fontsource/inter"
import "@fontsource/inter/600.css"
import Link from "next/link"
import { useState, useEffect } from "react"
import Alert from "@/components/Alert"
import Button from "@/components/Button"
import { useRouter } from "next/router"

const Verify = () => {
    // States
    const { userId, token } = useRouter()?.query;

    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [confirmPassword, setConfirmPassword] = useState(null);
    const [isValidPass, setIsValidPass] = useState(false);

    const [isLoading, setIsLoading] = useState(true);
    const [alert, setAlert] = useState(null);

    useEffect(() => {
        setIsLoading(true);
        if (!userId || !token) {
            setAlert({
                status: "error",
                title: "Invalid credentials.",
                description: "Error occurred. Please ensure userId & token passed"
            })
            setIsLoading(false);
        } else {
            verify();
        }
    }, [userId, token])
    
    const verify = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/verify?userId=${userId}&token=${token}`, {
                method: 'GET',
            })
            const data = await response.json();
            setIsLoading(false);
            setAlert({ 
                status: data?.message ? "success" : "error", 
                title: data?.message ? "Verification successful" : "Error Occurred", 
                description: data?.message ? data.message : data.error
            });
        } catch (err) {
            setIsLoading(false);
            setAlert({ 
                status: "error", 
                title: "Error Occurred", 
                description: "Failed to reach server"
            });
        }
    }

    return (
        <>
            <Head>
                <title>Brulee Patisserie | Verify Account</title>
                <meta name="description" content="Verify Account" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Navbar/>
            <VStack height="15vh" width="100vw" bg="#9ED8EA"/>
            <VStack width="100vw" minHeight="85vh" bg="white" align="center" justify="start" fontFamily="Inter" spacing="0" paddingTop="3rem">
                <HStack spacing="0" height="20vh" width={{ base: "90vw", sm: "80vw", md: "32rem" }}>
                    <Image
                        fit="contain"
                        height="100%"
                        src="./worker1.png"
                        alt="workerImage"
                    />
                    <VStack spacing="0" align="start" justify="center">
                        <Text fontWeight="600" fontSize={{ base: "1.1rem", md: "1.25rem" }}>Verify Your Account</Text>
                    </VStack>
                </HStack>
                <VStack>
                    { isLoading ? (
                        <Spinner/>
                    ) : (
                        <VStack spacing="3rem" height="30vh" justify="center">
                            <Alert status={alert.status} title={alert.title} description={alert.description} isShown={alert.isShown}/>
                            <Button link="/login" content="Log In" main="true"/>
                        </VStack>
                    )
                    }
                </VStack>
            </VStack>
            <Footer/>
        </>
    )
}

export default Verify