import { VStack, Image, Text } from "@chakra-ui/react"

const Error = ({ height, message }) => {
    return (
        <VStack height={height} align="center" justify="center" spacing="1rem" color="black" fontFamily="Inter">
            <Image src="./oops.svg" alt="Error" height="10vh" id="error-img"/>
            <Text fontSize="2rem" fontWeight="600">Oops!</Text>
            <Text width="50%" textAlign="center" fontWeight="400">{message}</Text>
        </VStack>
    )
}

export default Error