import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"
import { HStack, VStack, Image, Text, FormControl, FormLabel, Spinner, Input } from "@chakra-ui/react"
import Head from "next/head"
import "@fontsource/inter"
import "@fontsource/inter/600.css"
import Link from "next/link"
import { useState } from "react"
import Alert from "@/components/Alert"
import Button from "@/components/Button"
import { useRouter } from "next/router"
import { useDispatch } from "react-redux"
import { login } from "@/redux/auth/authReducer"

const Login = () => {
    const dispatch = useDispatch();

    // States
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const router = useRouter();

    const [alert, setAlert] = useState(null);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password,
                })
            })
            const data = await response.json();
            setIsLoading(false);
            setAlert({ 
                status: data?.user ? "success" : "error", 
                title: data?.user ? "Login successful" : "Error Occurred", 
                description: data?.user ? "Redirecting to home page" : data.error
            });
            if (data?.user) {
                dispatch(login({ user: data.user, token: data.accessToken }));
                router.push('/');
            }
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
    }

    return (
        <>
            <Head>
                <title>Brulee Patisserie | Login</title>
                <meta name="description" content="Login" />
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
                        src="./worker2.png"
                        alt="workerImage"
                    />
                    <VStack spacing="0" align="start" justify="center">
                        <Text fontWeight="600" fontSize={{ base: "1.1rem", md: "1.25rem" }}>Login To Account</Text>
                        <Text fontSize={{ base: "0.8rem", md: "0.9rem" }} width={{ base: "70%", md: "100%" }} display={{ base: "none", sm: "block"}}>Login to your account to continue shopping!</Text>
                    </VStack>
                </HStack>
                <form onSubmit={handleSubmit}>
                    <VStack align="center" justify="start" spacing="2rem" width={{ base: "90vw", sm: "80vw", md: "32rem" }} paddingTop="1rem" paddingBottom="2rem">
                        { isLoading && <Spinner/>}
                        { alert && <Alert status={alert.status} title={alert.title} description={alert.description} isShown={alert.isShown}/>}
                        <FormControl isRequired>
                            <FormLabel fontWeight="600" fontSize="1rem">Email</FormLabel>
                            <Input 
                                type="email" w="100%" placeholder="Enter email" borderRadius="0"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </FormControl>
                        <FormControl isRequired paddingBottom="1rem">
                            <FormLabel fontWeight="600" fontSize="1rem">Password</FormLabel>
                            <Input 
                                type="password" w="100%" placeholder="Enter password" borderRadius="0"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </FormControl>
                        <Button content="Log In" main="true" type="submit"/>
                        <Text w="100%" align="center" decoration="underline">Don&apos;t have an account? <Link href="/register">Register here!</Link></Text>
                    </VStack>   
                </form>
            </VStack>
            <Footer/>
        </>
    )
}

export default Login