import { toggleChat, updateChat } from "@/redux/chatReducer";
import { HStack, VStack, Box, Text, Input, Container, CloseButton, Spinner } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux"
import { BsChatLeftTextFill, BsFillSendFill } from "react-icons/bs";
import { useState } from "react";

const ChatBot = () => {
    const dispatch = useDispatch();
    const chat = useSelector((state) => (state.chat));
    const user = useSelector((state) => (state.user));

    const [sentMessage, setSentMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(null)

    const handleChat = async () => {
        if (sentMessage == '' || !sentMessage) {
            return;
        }
        dispatch(updateChat({
            sender: user?.name ? user.name : "Customer",
            message: sentMessage
        }));

        try {
            setIsLoading(true);
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/chat/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    message: sentMessage
                })
            })
            const data = await response.json();
            setIsLoading(false);
            if (data?.message) {
                dispatch(updateChat({
                    sender: "bot",
                    message: data?.message
                }))
            } else {
                dispatch(updateChat({
                    sender: "bot",
                    message: "Oops... there seems to be an error from my server. Please try chatting with me another time. Sorry for the inconvenience."
                }))
            }
        } catch (error) {
            setIsLoading(false);
            console.log('Error while fetching POST request on chat bot: ', error)
            dispatch(updateChat({
                sender: "bot",
                message: "Oops... there seems to be an error from my server. Please try chatting with me another time. Sorry for the inconvenience."
            }))
        }
        setSentMessage('');
    }

    return (
        <Box 
            position="fixed"
            zIndex="999"
        >
            { chat.isToggled && <VStack bg="white" maxHeight="70vh" width={{ sm: "60vw", md: "40vw", lg: "30vw" }} justify="start" align="center" spacing="1rem" position="fixed" bottom="2rem" right={{ sm: "0", md: "2rem" }} borderRadius="1rem" className="floating-2"
            boxShadow="0 4px 8px rgba(0, 0, 0, 0.1)">
                <HStack width="100%" height="10%" bg="gray.100" padding="0.5rem" justify="center" borderRadius="1rem 1rem 0 0">
                    <Text color="black" fontWeight="600">Got Any Questions?</Text>
                    <CloseButton onClick={() => dispatch(toggleChat())}/>
                </HStack>
                <VStack padding="1rem" height="80%" overflow="scroll">
                {
                    chat.messages.map((message) => {
                        if (message.sender == "bot") {
                            return (
                                <VStack key={message.sender} width="100%" align="left">
                                    <VStack width="70%" bg="#E0E0E0" padding="0.5rem" fontSize="0.8rem" color="black" align="start" borderRadius="0.5rem" spacing="0">
                                        <b>Jean</b>
                                        <Text>{message}</Text>
                                    </VStack>
                                </VStack>
                            )
                        } else {
                            return (
                                <VStack key={message} width="100%" align="end">
                                    <VStack width="70%"  bg="#007AEA" padding="0.5rem" fontSize="0.8rem" color="white" align="end" borderRadius="0.5rem" spacing="0">
                                        <b>{ user ? user.name : "Customer" }</b>
                                        <Text textAlign="right">{message.message}</Text>
                                    </VStack>
                                </VStack>
                            )
                        }
                    })
                }
                </VStack>
                <HStack width="100%" align="center" padding="1rem" height="10%">
                    <Input value={sentMessage} fontSize="0.8rem" padding="0.5rem" width="90%" onChange={(e) => setSentMessage(e.target.value)}/>
                    { isLoading ? <Spinner color="gray.500"/> : 
                    <Container width="10%" _hover={{ cursor: "pointer" }} onClick={handleChat} textAlign="center">
                        <BsFillSendFill color="#CB7435"/>
                    </Container>
                    }   
                </HStack>
            </VStack> }
            { chat?.isToggled || <Box
            position="fixed"
            bottom="2rem"
            right="2rem"
            p={4}
            backgroundColor="#A5551B" 
            color="white"
            borderRadius="20%"
            _hover={{ cursor: "pointer" }}
            className="floating-2"
            onClick={() => dispatch(toggleChat())}
            boxShadow="0 4px 8px rgba(0, 0, 0, 0.1)"
            >
                { chat.messages.length > 0 && <Text position="absolute" bottom="2rem" left="2.5rem" borderRadius="1rem" bg="red.500" padding="0.25rem 0.5rem">{chat.messages.length}</Text> }
                <BsChatLeftTextFill fontSize="1.25rem"/>
            </Box> }
        </Box>
    )
}

export default ChatBot