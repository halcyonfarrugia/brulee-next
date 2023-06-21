import { useRouter } from "next/router"
import { useDispatch, useSelector } from "react-redux";
import { HStack, VStack, Text, Spinner, Image, Flex, Container } from "@chakra-ui/react"
import Error from "@/components/Error";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Head from "next/head"
import { useEffect, useState } from "react"

import "@fontsource/inter/600.css"
import "@fontsource/inter"
import "@fontsource/eb-garamond"
import CustomButton from "@/components/Button";
import { addToCart } from "@/redux/cartReducer";
import { BsBoxArrowInLeft } from "react-icons/bs";
import ChatBot from "@/components/ChatBot";

const Product = () => {
    const router = useRouter();
    const { user } = useSelector((state) => (state.auth))

    const [isLoading, setIsLoading] = useState(null);
    const [product, setProduct] = useState(null);
    const [error, setError] = useState(null);

    const dispatch = useDispatch();

    useEffect(() => {
        fetchProduct();
    }, [router.query.id])

    const fetchProduct = async () => {
        setIsLoading(true);
        if (!router.query.id) {
            setIsLoading(false)
            setError("No ID passed. Product not found.")
            return;
        }
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/product/${router.query.id}`, {
                method: "GET",
                headers: {
                    'ContentType': 'application/json'
                }
            })
            const data = await response.json()
            console.log(data)
            setIsLoading(false)
            if (data?.product) {
                setProduct(data.product);
            } else {
                console.log(data?.error);
                setError(data?.error)
            }
        } catch (error) {
            console.log('Error occurred in fetch GET request to product route: ', error)
            setIsLoading(false);
        }
    }

    return (
        <>
            <Head>
                <title>Brulee Patisserie | Product</title>
                <meta name="description" content="Store" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Navbar/>
            <ChatBot/>
            <HStack id="navBg" height="15vh" width="100vw" bg="#9ED8EA">
            </HStack>
            {
                isLoading ? (
                    <VStack align="center" justify="center" height="85vh" bg="white">
                        <Spinner/>
                    </VStack>
                ) : (
                    product ? (
                        <VStack minHeight="85vh" width="100vw" bg="white">
                            <HStack height="7.5vh" width="100%" fontSize="0.75rem" fontFamily="EB Garamond" bg="#ECDAC6" justify="center" position="relative">
                                <b>Currently, all {product.category} purchases will only be available for pick-up.</b>
                                <HStack color="black" onClick={() => router.push('/store')} position="absolute" top="125%" left="1rem" _hover={{ cursor: "pointer", textDecor: "underline"}} align="Center">
                                    
                                <BsBoxArrowInLeft fontSize="1.25rem"/>
                                <Text fontSize="1rem"><b>Continue Browsing</b></Text>
                            </HStack>
                            </HStack>
                            <Flex direction={{ base: "column", md: "row" }} align="center" minHeight="77.5vh" bg="white" padding="5rem" fontFamily="Inter">
                                <Image src={product.imageUrl} fit="contain" className="floating" zIndex="1" width={{ base: "85%", md: "50%" }} marginRight={{ base: 0, md: "2rem"}} marginBottom={{ base: "2rem", md: 0 }}/>
                                <VStack align="center" justify="center" spacing="2rem" width={{ base: "100%", md: "50%" }} zIndex="3">
                                    <HStack align="center" spacing="1rem">
                                        <Text 
                                            fontSize={{ sm: "1rem", md: "1.25rem" }} fontWeight="600" textDecor="underline"
                                        >
                                            {product.name}
                                        </Text>
                                        <Text fontSize="1rem" fontFamily="EB Garamond"><i>${product.price}</i></Text>
                                    </HStack>
                                    
                                    <Text fontSize={{ sm: "0.8rem", md: "1rem" }} maxWidth="24rem" textAlign="center" fontFamily="EB Garamond">
                                        {product.description}
                                    </Text>
                                    <CustomButton main="true" content="Add to Cart" onClick={() => dispatch(addToCart(product))}/>
                                </VStack>
                            </Flex>
                        </VStack>
                    ) : <Error height="85vh" message={error}/>
                )
            }
            <Footer/>
        </>
    )
}

export default Product