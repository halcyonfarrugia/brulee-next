import { HStack, VStack, Image, Select, Text, Spinner, Button, Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react"
import { useSelector } from "react-redux"
import Head from "next/head"
import Navbar from "@/components/Navbar"
import "@fontsource/inter/600.css"
import "@fontsource/inter"
import Footer from "@/components/Footer"
import Error from "@/components/Error"
import AddProduct from "@/components/Store/AddProduct"
import ProductGrid from "@/components/Store/ProductGrid"
import { useEffect, useState } from "react"
import ChatBot from "@/components/ChatBot"
import { ChevronDownIcon } from "@chakra-ui/icon"

const Store = () => {
    const { user } = useSelector((state) => (state.auth));
    const [isLoading, setIsLoading] = useState(null);
    const [products, setProducts] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchProducts();
    }, [])

    const fetchProducts = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/product/`, {
                method: "GET",
                headers: {
                    'ContentType': 'application/json'
                }
            })
            const data = await response.json()
            console.log(data)
            setIsLoading(false)
            if (data?.products) {
                setProducts(data.products);
                setError(data?.error)
            } else {
                console.log(data?.error);
                setError(data?.error)
            }
        } catch (error) {
            console.log('Error occurred in fetch GET request to products route: ', error)
            setError("We're having some trouble connecting to the server. Please try again another time!")
            setIsLoading(false);
        }
    }

    return (
        <>
            <Head>
                <title>Brulee Patisserie | Store</title>
                <meta name="description" content="Store" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Navbar/>
            <HStack id="navBg" height="15vh" width="100vw" bg="#9ED8EA">
            </HStack>
            <ChatBot/>
            <HStack height="15vh" width="100vw" bg="#ba741e" justify="space-between" padding="0 2rem">
                <HStack>
                    <Image src="./menu-croissant.svg" width={{ base: "20%", md: "10%" }} maxHeight="100%"/>
                    <VStack align="start" color="white" fontFamily="Inter" justify="center" paddingLeft="1rem">
                        <Menu zIndex="10">
                            <MenuButton as={Button} bg="#945609" _hover={{ bg: "#b86b0d" }} _active={{ bg: "#b86b0d" }}>
                                Type
                            </MenuButton>
                            <MenuList zIndex="10" bg="#bf8339">
                                <MenuItem bg="#bf8339">Croissanterie</MenuItem>
                            </MenuList>
                        </Menu>
                    </VStack>
                </HStack>
                { user?.isAdmin && <AddProduct/> }
            </HStack>
            {
                isLoading ? (
                    <VStack align="center" justify="center" height="70vh" bg="white">
                        <Spinner/>
                    </VStack>
                ) : (
                    products ? <ProductGrid products={products}/> : 
                    <VStack height="70vh" bg="white" paddingTop="5rem">
                        <Error message={error}/>
                    </VStack>
                )
            }
            <Footer/>
        </>
    )
}

export default Store