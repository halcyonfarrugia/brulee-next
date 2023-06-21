import { HStack, VStack, Image, Text } from "@chakra-ui/react"
import "@fontsource/inter"
import "@fontsource/inter/600.css"

const Alert = ({ status, title, description }) => {
    let mainColor;
    if (status == 'success') {
        mainColor = "#81d26a";
    } else if (status == 'error') {
        mainColor = "#d26a6a";
    } else {
        mainColor = "#ffb908";
    }

    return (
        <HStack height="5rem" padding="1rem 1.5rem" align="center" justify="center" spacing="1rem" fontFamily="Inter" marginBottom="1rem" bg={mainColor} borderRadius="1rem" shadow={"0.2rem 0.2rem 3rem " + mainColor} display="flex">
            <Image src="./oops.svg" alt="Error" height="100%" id="error-img" bottom="0.25rem" position="relative"/>
            <VStack align="start" justify="center" spacing="0" paddingRight="2rem">
                <Text fontWeight="600" fontSize="1rem">{title}</Text>
                <Text fontSize="0.75rem">{description}</Text>
            </VStack>
        </HStack>
    )
}

export default Alert