import { SimpleGrid, Image, VStack, Text } from "@chakra-ui/react"
import "@fontsource/inter"
import "@fontsource/inter/600.css"
import { useRouter } from "next/router"

const ProductGrid = ({ products }) => {
    const router = useRouter();

    return (
        <SimpleGrid columns={[1, 2, 3, 4]} width="100%" bg="#ffd7a6" minHeight="70vh" spacing="1rem" padding="1rem">
            {
                products.map((product) => (
                    <VStack key={product.id} bg='white' spacing="0" justify="start" maxHeight="512px" fontFamily="Inter" onClick={() => router.push(`/product?id=${product.id}`)} position="relative" borderRadius="1rem" _hover={{ cursor: "pointer" }}>
                        <Image src={product.imageUrl} alt={product.imageUrl} padding="3rem" fit="contain" width="100%" height="80%" zIndex="2" bg="white" borderRadius="1rem"/>
                        <VStack width="100%" height="20%" align="start" justify="center" bg="#A5551B" paddingLeft="1rem" spacing="0" color="white" borderBottomRadius="1rem">
                            <Text fontSize="1rem" fontWeight="600" textAlign="center" _hover={{ textDecor: "underline" }}>{product.name}</Text>
                            <Text fontSize="1rem"><i>${product.price}</i></Text>
                        </VStack>
                    </VStack>
                ))
            }
        </SimpleGrid>
    )
}

export default ProductGrid;