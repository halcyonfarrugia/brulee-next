import Navbar from "@/components/Navbar"
import Head from "next/head"
import { Flex, FormControl, FormLabel, HStack, Input, VStack, Text, Image } from "@chakra-ui/react"
import "@fontsource/inter"
import "@fontsource/inter/600.css"
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import CartItem from "@/components/Cart/CartItem"
import { useDispatch, useSelector } from "react-redux"
import CustomButton from "@/components/Button"
import { useState } from "react"
import Alert from "@/components/Alert"
import Error from "@/components/Error"
import { useRouter } from "next/router"
import { deleteCart } from "@/redux/cartReducer"

const Checkout = () => {
    const router = useRouter();
    const items = useSelector((state) => (state.cart.items));
    const [detailsComplete, setDetailsComplete] = useState(false);
    const [pickUp, setPickUp] = useState(null);
    const [phoneNumber, setPhoneNumber] = useState(null);
    const [alert, setAlert] = useState(null);
    const { user, token } = useSelector((state) => (state.auth));
    const dispatch = useDispatch();

    // Order
    const [userId, setUserId] = useState(user ? user.id : null);
    const [cartItems, setCartItems] = useState(items ? items : null);

    const handleProceed = () => {
        const selectDate = new Date(pickUp);
        console.log(selectDate);
        const currentDate = new Date();

        const twoDaysFromNow = new Date();
        twoDaysFromNow.setDate(currentDate.getDate() + 2);

        const sevenDaysFromNow = new Date();
        sevenDaysFromNow.setDate(currentDate.getDate() + 7);

        if (selectDate >= twoDaysFromNow && selectDate <= sevenDaysFromNow) {
            const phoneRegex = /^\d{10}$/;
            const cleanPhoneNumber = phoneNumber.replace(/\D/g, '');
            if (phoneRegex.test(cleanPhoneNumber)) {
                setDetailsComplete(true);
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

    const createOrder = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/order/`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ userId: user.id, items, pickUp: new Date(pickUp) }),
            });
            const data = await response.json();
            setAlert({ status: data?.data ? "success" : "error", title: data?.data ? "Order successful" : "Error in order. Please contact us if payment has been made.", description: data.message })
            setTimeout(() => {
                if (data?.data) {
                    router.push('/');
                    dispatch(deleteCart());
                }
                setAlert(null);
            }, 3000);
        } catch (error) {
            console.log(error);
            setAlert({ status: "error", title: "Error in reaching server.", description: "Error in reaching server. Please contact us if payment already made." });
            setTimeout(() => {
                setAlert(null);
            }, 4000);
        }
    }

    return (
        <>
            <Head>
                <title>Brulee Patisserie | Checkout</title>
                <meta name="description" content="Checkout for Brulee" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Navbar/>
            <HStack id="navBg" height="15vh" width="100vw" bg="#9ED8EA">
            </HStack>
            <VStack minHeight="85vh" bg="white" width="100vw" padding="1rem" fontFamily="Inter">
                <HStack spacing="2rem" height="20vh" width={{ base: "90vw", sm: "80vw", md: "32rem" }}>
                    <Image
                        fit="contain"
                        height="100%"
                        src="./checkout.png"
                        alt="cashierImage"
                    />
                    <VStack spacing="0" align="start" justify="center">
                        <Text fontWeight="600" fontSize={{ base: "1.1rem", md: "1.25rem" }}>Checkout</Text>
                        <Text fontSize={{ base: "0.8rem", md: "0.9rem" }} width={{ base: "70%", md: "100%" }} display={{ base: "none", sm: "block"}}>
                            Please fill in the billing details and proceed with payment to complete the order!
                        </Text>
                    </VStack>
                </HStack>
                { user && items.length > 0 ? 
                <Flex direction={{ base: "column", md: "row" }} align="start" minHeight="65vh" bg="white" padding="2rem" fontFamily="Inter" justify="space-around" width="100%">
                    <VStack spacing="2rem" justify="center" width={{ base: "80%", md: "40%" }}>
                        <FormControl isRequired>
                            <FormLabel fontWeight="600">Contact Phone Number</FormLabel>
                            <Input type="tel" borderRadius="0" placeholder="Enter phone number" isDisabled={detailsComplete} onChange={(e) => setPhoneNumber(e.target.value)}/>
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel fontWeight="600">Pick Up Details</FormLabel>
                            <Input type="datetime-local" borderRadius="0" isDisabled={detailsComplete} onChange={(e) => setPickUp(e.target.value)}/>
                        </FormControl>
                        { alert && <Alert status={alert.status} title={alert.title} description={alert.description}/>}
                        {
                            !detailsComplete ? 
                            <CustomButton content="Proceed to Payment" main="true" onClick={handleProceed} isDisabled={detailsComplete}/> : (
                                <FormControl>
                                    <PayPalScriptProvider options={{ "client-id" : process.env.NEXT_PUBLIC_CLIENT_ID, currency: "AUD" }}>
                                        <PayPalButtons
                                            createOrder={(data, actions) => {
                                                return actions.order
                                                    .create({
                                                        purchase_units: [
                                                            {
                                                                amount: {
                                                                    currency_code: "AUD",
                                                                    value: items.reduce((total, item) => total + (item.price * item.quantity), 0),
                                                                },
                                                            },
                                                        ],
                                                    })
                                                    .then((orderId) => {
                                                        return orderId;
                                                    });
                                            }}
                                            onApprove={function (data, actions) {
                                                return actions.order.capture().then(function () {
                                                    createOrder();
                                                });
                                            }}
                                        />
                                    </PayPalScriptProvider>
                                </FormControl>
                            )
                        }
                    </VStack>
                    <VStack width={{ base: "80%", md: "40%" }} align="start">
                        {
                            items && items?.length > 0 && items.map((item) => <CartItem key={item.id} item={item} checkout="true"/>)
                        }
                        { items && items?.length > 0 && <Text fontSize="1rem" padding="0.25rem 0.5rem" top="1rem">
                            <b>Total Amount: </b> 
                            ${items.reduce((total, item) => total + (item.price * item.quantity), 0)}
                        </Text> }
                    </VStack>
                </Flex> : 
                <Error height="65vh" message="Please make sure you are logged in and have items in the cart."/>
                }
            </VStack>
            
        </>
    )
}

export default Checkout