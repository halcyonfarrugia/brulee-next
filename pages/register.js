import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"
import { HStack, VStack, Image, Text, FormControl, FormLabel, Flex, Input, FormHelperText, Spinner } from "@chakra-ui/react"
import Head from "next/head"
import "@fontsource/inter"
import "@fontsource/inter/600.css"
import Link from "next/link"
import { useState } from "react"
import Alert from "@/components/Alert"
import Button from "@/components/Button"

const Register = () => {
    // States
    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [confirmPassword, setConfirmPassword] = useState(null);
    const [isValidPass, setIsValidPass] = useState(false);

    const [isLoading, setIsLoading] = useState(null);
    const [alert, setAlert] = useState(null);

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()]).{8,}$/;
        if (passwordRegex.test(e.target.value)) {
            setIsValidPass(true);
        } else {
            setIsValidPass(false);
        };
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isValidPass && (password == confirmPassword)) {
            try {
                setIsLoading(true);
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/register`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name: firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase() + ' ' + lastName.charAt(0).toUpperCase() + lastName.slice(1).toLowerCase(),
                        email,
                        password,
                    })
                })
                const data = await response.json();
                setIsLoading(false);
                setAlert({ 
                    status: data?.message ? "success" : "error", 
                    title: data?.message ? "Registration successful" : "Error Occurred", 
                    description: data?.message ? data.message : data.error
                });
                setTimeout(() => {
                    setAlert(false);
                }, 7000);
            } catch (err) {
                setIsLoading(false);
                console.log(`Error: ${err}`);
                setAlert({ status:"error", title: "Error Occurred", description: "Could not reach server. Please try again later."});
                setTimeout(() => {
                    setAlert(false);
                }, 5000);
            }
        } else {
            setAlert({ title: "Phone Number or Password Invalid", description: "Please make sure phone number or password is validly entered/matched.", isShown: true})
            setTimeout(() => {
                setAlert(false);
            }, 5000);
        }
    }

    return (
        <>
            <Head>
                <title>Brulee Patisserie | Register New Account</title>
                <meta name="description" content="Register Account" />
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
                        src="./worker1.png"
                        alt="workerImage"
                    />
                    <VStack spacing="0" align="start" justify="center">
                        <Text fontWeight="600" fontSize={{ base: "1.1rem", md: "1.25rem" }}>Register New Account</Text>
                        <Text fontSize={{ base: "0.8rem", md: "0.9rem" }} width={{ base: "70%", md: "100%" }} display={{ base: "none", sm: "block"}}>Create your account to receive newest updates about our best products!</Text>
                    </VStack>
                </HStack>
                <form onSubmit={handleSubmit}>
                    <VStack align="center" justify="start" spacing="1rem" width={{ base: "90vw", sm: "80vw", md: "32rem" }} paddingTop="1rem" paddingBottom="2rem">
                        { isLoading && <Spinner/>}
                        { alert && <Alert status={alert.status} title={alert.title} description={alert.description} isShown={alert.isShown}/>}
                        <FormControl isRequired w="100%" spacing="1rem" align="start">
                            <FormLabel fontWeight="600" fontSize="1rem">
                                Contact Details
                            </FormLabel>
                            <VStack w="100%" align="start" spacing="1rem">
                                <Flex direction={{ base: "column", md: "row"}} w="100%">
                                    <Input 
                                        marginRight="1rem"
                                        placeholder="Enter first name"
                                        w={{ base: "100%", md: "50%" }}
                                        borderRadius="0"
                                        onChange={(e) => setFirstName(e.target.value)}
                                    />
                                    <Input
                                        marginTop={{ base: "1rem", md: 0 }}
                                        placeholder="Enter last name"
                                        w={{ base: "100%", md: "50%" }}
                                        borderRadius="0"
                                        onChange={(e) => setLastName(e.target.value)}
                                    />
                                </Flex>
                                <Input 
                                    type="email" w="100%" placeholder="Enter email address" borderRadius="0"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </VStack>
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel fontWeight="600" fontSize="1rem">Password</FormLabel>
                            <Input 
                                type="password" w="100%" placeholder="Enter password" borderRadius="0"
                                onChange={handlePasswordChange}
                            />
                            <FormHelperText w="100%" fontSize="0.75rem">Password must contain at least 1 symbol, uppercase letter & lowercase letter.</FormHelperText>
                        </FormControl>
                        <FormControl isRequired paddingBottom="1rem">
                            <FormLabel fontWeight="600" fontSize="1rem">Confirm Password</FormLabel>
                            <Input 
                                type="password" w="100%" placeholder="Enter password again" borderRadius="0"
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </FormControl>
                        <Button content="Register" main="true" type="submit"/>
                        <Text w="100%" align="center" decoration="underline">Already have an account? <Link href="/login">Login here!</Link></Text>
                    </VStack>   
                </form>
            </VStack>
            <Footer/>
        </>
    )
}

export default Register