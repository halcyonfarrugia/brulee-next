import { addToCart, decrement, remove } from "@/redux/cartReducer";
import { HStack, Image, VStack, Text, Container } from "@chakra-ui/react"
import { HiPlusSm, HiMinusSm } from "react-icons/hi"
import { IoMdTrash } from "react-icons/io"
import { useDispatch } from "react-redux"

const CartItem = ({ item, checkout }) => {
    const dispatch = useDispatch();
    return (
        <HStack width="100%" height="128px" paddingX="1rem">
            <HStack height="100%" spacing="1rem">
                <Image src={item.imageUrl} fit="contain" width="25%" />
                <VStack align="left">
                    <Text fontSize={ checkout ? "0.75rem" : "1rem"}>
                        { checkout ? item.name : <b>{item.name}</b> }
                    </Text>
                    <Text fontSize="0.75rem">
                        { checkout ? 
                            "Quantity: " : <b>Quantity: </b>
                        }
                        {item.quantity}
                    </Text>
                    <Text fontSize="0.75rem">${item.price}</Text>
                </VStack>
            </HStack>
            {
                checkout || <VStack height="100%" justify="center">
                <Container _hover={{ cursor: "pointer" }}>
                    <HiPlusSm fontSize="1.25rem" onClick={() => dispatch(addToCart(item))}/>
                </Container>
                <Container _hover={{ cursor: "pointer" }}>
                    <HiMinusSm fontSize="1.25rem" onClick={() => dispatch(decrement(item))}/>
                </Container>
                <Container _hover={{ cursor: "pointer" }}>
                    <IoMdTrash fontSize="1.25rem" onClick={() => dispatch(remove(item))}/>
                </Container>
            </VStack>
            }
        </HStack>
    )
}

export default CartItem