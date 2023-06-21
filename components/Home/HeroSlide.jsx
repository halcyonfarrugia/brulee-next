import { Flex, VStack, Text, Hide, Image } from "@chakra-ui/react"
import Button from "../Button"

const HeroSlide = ({ heading, subHeading, buttonContent, href, imgSrc, slideBgColor }) => {
    return (
        <Flex
        direction={{ base: "column", md: "row" }}
        width="100vw"
        height="100vh"
        paddingTop="4rem"
        backgroundColor={slideBgColor}
        overflow="hidden"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <VStack width={{ base: "100%", md: "60%", lg: "40%" }} align={{ base: "center", md: "end" }} fontFamily="inter" spacing="2rem" zIndex="2">
          <Text fontSize={{ base: "1.5rem", md: "2.5rem" }} textAlign={{ base: "center", md: "end"}} width={{ base: "70%", md: "90%", lg: "80%" }} fontWeight="800" color="white">
            {heading}
          </Text>
          <Hide below="md">
            <Text width="60%" fontSize="1rem"  textAlign={{ base: "center", md: "right" }} color="white" fontWeight="600">
              {subHeading}
            </Text>
          </Hide>
          <Button link={href} content={buttonContent} main="true"/>
        </VStack>
        <Image fit="contain" width={{ base: "70%", md: "40%" }} src={imgSrc} css={{ animation: `rotate 120s linear infinite` }} zIndex="1"/>
      </Flex>
    )
}

export default HeroSlide