import { HStack, Image, Text, VStack, Box, Hide, Heading, Grid, GridItem, Flex, Accordion, AccordionIcon, AccordionButton, AccordionPanel, AccordionItem} from "@chakra-ui/react"
import Head from "next/head"
import Navbar from "@/components/Navbar"
import Button from "@/components/Button"

// Fonts
import "@fontsource/eb-garamond"
import "@fontsource/eb-garamond/600.css"

// Icons
import { BsArrowRight } from "react-icons/bs"
import HeroSlide from "@/components/Home/HeroSlide"
import Footer from "@/components/Footer"
import ChatBot from "@/components/ChatBot"
import { useDispatch } from "react-redux"
import { toggleChat } from "@/redux/chatReducer"

const Faq = () => {
    const dispatch = useDispatch();
  return (
    <>
      <Head>
        <title>Brulee Patisserie | FAQ</title>
        <meta name="description" content="Frequently Asked Questions" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar/>
      <ChatBot/>
        <Flex
        direction={{ base: "column", md: "row" }}
        width="100vw"
        minHeight="100vh"
        backgroundColor="#9ED8EA"
        overflow="hidden"
        display="flex"
        justifyContent="center"
        fontFamily="EB Garamond"
        alignItems="center"
        >
        <VStack width={{ base: "100%", md: "50%" }} height="100vh" bg="#9ED8EA" justify="center" paddingTop="4rem" spacing="1rem">
            <Text fontSize={{ base: "1.5rem" }} textAlign={{ base: "center" }} width={{ base: "70%", md: "90%", lg: "80%" }} fontWeight="800" color="white">
                Frequently Asked Questions
            </Text>
            <Text width="60%" fontSize="1rem"  textAlign={{ base: "center", }} color="white" fontWeight="600">
                If you have any further queries, try our AI ChatBot or contact us via the contact us page!
            </Text>
            <Image fit="contain" width={{ base: "60%", md: "40%", lg: "30%" }} src="./croissant-3.png" alt="croissaint" css={{ animation: `rotate 120s linear infinite` }} zIndex="0"/>
            <Button content="Ask AI ChatBot" onClick={() => dispatch(toggleChat())} main="true" zIndex="99"/>
        </VStack>
        <VStack width={{ base: "100%", md: "50%" }} height="100vh" bg="#9ED8EA" justify="center" align="start" paddingTop="4rem" spacing="1rem" padding="2rem" overflow="scroll">
            <Accordion bg="white" allowToggle>
                <AccordionItem>
                    <AccordionButton bg="gray.100">
                        <Box as="span" flex='1' textAlign='left'>
                            Are your products made-to-order?
                        </Box>
                        <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel pb={4}>
                        Yes, all our products are made-to-order, guaranteeing freshness.
                    </AccordionPanel>
                </AccordionItem>
                <AccordionItem>
                    <AccordionButton bg="gray.100">
                        <Box as="span" flex='1' textAlign='left'>
                            How long does it take to prepare an order?
                        </Box>
                        <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel pb={4}>
                        Kindly allow us 48 hours to prepare your order.
                    </AccordionPanel>
                </AccordionItem>
                <AccordionItem>
                    <AccordionButton bg="gray.100">
                        <Box as="span" flex='1' textAlign='left'>
                            What is the pick-up schedule for orders?
                        </Box>
                        <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel pb={4}>
                        Orders placed before 2:30 pm on Saturday will be ready for pick-up on the following Tuesday.
                        Orders placed before 2:30 pm on Wednesday will be ready for pick-up on the following Friday.
                    </AccordionPanel>
                </AccordionItem>
                <AccordionItem>
                    <AccordionButton bg="gray.100">
                        <Box as="span" flex='1' textAlign='left'>
                            Can I order hampers?
                        </Box>
                        <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel pb={4}>
                        Yes, we can produce limited numbers of hampers. Please contact us to place your order.
                    </AccordionPanel>
                </AccordionItem>
                <AccordionItem>
                    <AccordionButton bg="gray.100">
                        <Box as="span" flex='1' textAlign='left'>
                            What are the baking instructions for croissants?
                        </Box>
                        <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel pb={4}>
                        To ensure you enjoy a perfectly crunchy treat, follow these six easy steps:<br/>
                        Step 1: Preheat your oven to 200°C.<br/>
                        Step 2: Place the croissants on a parchment-lined baking tray, ensuring they are 3 inches apart.<br/>
                        Step 3: Let the croissants rest at room temperature for approximately 20 minutes.<br/>
                        Step 4: Place the croissants in the oven and reduce the temperature to 180°C.<br/>
                        Step 5: Bake the croissants for 25-30 minutes or until they turn golden brown.<br/>
                        Step 6: Remove from the oven and allow a 15-minute cool-down time before indulging.
                    </AccordionPanel>
                </AccordionItem>
                <AccordionItem>
                    <AccordionButton bg="gray.100">
                        <Box as="span" flex='1' textAlign='left'>
                            What payment options are available?
                        </Box>
                        <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel pb={4}>
                        You can make payments through our secure payment system, which accepts Visa or Mastercard. Alternatively, you can use PayPal.
                    </AccordionPanel>
                </AccordionItem>
                <AccordionItem>
                    <AccordionButton bg="gray.100">
                        <Box as="span" flex='1' textAlign='left'>
                            Do your products contain allergens?
                        </Box>
                        <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel pb={4}>
                        Yes, our products contain traces of nuts and may not be suitable for individuals with nut allergies. If you have other allergies, such as gluten, please check the ingredients to ensure they are safe for you. We cannot be held responsible for any allergic reactions or intolerances.
                    </AccordionPanel>
                </AccordionItem>
                <AccordionItem>
                    <AccordionButton bg="gray.100">
                        <Box as="span" flex='1' textAlign='left'>
                            Can you guarantee specific results with your recipes?
                        </Box>
                        <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel pb={4}>
                        No, the outcome of the recipes may vary due to factors like oven type. While we strive to support you in achieving your goals, your success depends on your efforts, oven performance, and execution. We cannot guarantee specific results.
                    </AccordionPanel>
                </AccordionItem>
                <AccordionItem>
                    <AccordionButton bg="gray.100">
                        <Box as="span" flex='1' textAlign='left'>
                            Are you liable for any loss or damage incurred during packaging and delivery?
                        </Box>
                        <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel pb={4}>
                        We package our products securely, but for contactless deliveries, we cannot be held responsible for any loss or damage.
                    </AccordionPanel>
                </AccordionItem>
                <AccordionItem>
                    <AccordionButton bg="gray.100">
                        <Box as="span" flex='1' textAlign='left'>
                            How important is it to provide accurate information?
                        </Box>
                        <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel pb={4}>
                        We expect you to provide accurate information, including delivery details and availability times. You are responsible for the information you provide on our website.
                    </AccordionPanel>
                </AccordionItem>
                <AccordionItem>
                    <AccordionButton bg="gray.100">
                        <Box as="span" flex='1' textAlign='left'>
                            Should I exercise judgment and due diligence before implementing your ideas or recommendations?
                        </Box>
                        <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel pb={4}>
                        Yes, please exercise your own judgment and due diligence before implementing any ideas, suggestions, or recommendations from our website into your life, family, or business.
                    </AccordionPanel>
                </AccordionItem>
                <AccordionItem>
                    <AccordionButton bg="gray.100">
                        <Box as="span" flex='1' textAlign='left'>
                            Can you guarantee specific outcomes or results from using the information on your website?
                        </Box>
                        <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel pb={4}>
                        No, there are no guarantees regarding the specific outcome or results you can expect from using the information provided on our website.
                    </AccordionPanel>
                </AccordionItem>
            </Accordion>
        </VStack>
        </Flex>
        <Footer/>
    </>
)}

export default Faq