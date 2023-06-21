import { Button } from "@chakra-ui/react"
import Link from "next/link"

const CustomButton = ({ link, content, main, type, onClick, isDisabled }) => {
    return (
        <Button isDisabled={isDisabled} onClick={onClick} bg={ main ? "#CF9249" : "#EABD7B" } color="white" _hover={ main ? { bg: "#ba741e"} : { bg: "#e0a64f"}} borderRadius="0" type={type}>
        {
            link ? <Link href={link}>{content}</Link> : content
        }
        </Button>
    )
}

export default CustomButton