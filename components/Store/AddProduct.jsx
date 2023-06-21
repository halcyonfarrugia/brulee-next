import { Container, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, useDisclosure, FormControl, FormLabel, Input, Textarea, VStack, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, Image, Select, Spinner } from "@chakra-ui/react"
import { MdLibraryAdd } from "react-icons/md"
import "@fontsource/eb-garamond"
import "@fontsource/eb-garamond/600.css"
import CustomButton from "../Button"
import { useState } from "react"
import Alert from "../Alert"
import { useSelector } from "react-redux"

const AddProduct = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { token } = useSelector((state) => (state.auth));

    // Form States
    const [image, setImage] = useState(null)
    const [imgUrl, setImgUrl] = useState(null)
    const [name, setName] = useState(null)
    const [description, setDescription] = useState(null)
    const [price, setPrice] = useState(null)
    const [category, setCategory] = useState(null)

    const [isDisabled, setIsDisabled] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [alert, setAlert] = useState(false);

    const handleImg = (e) => {
        if(e.target && e.target.files[0]) {
            setImage(e.target.files[0])
            setImgUrl(URL.createObjectURL(e.target.files[0]))
        }
    }

    const handlePriceChange = (event) => {
        const inputPrice = event
        // remove any non-numeric characters and leading zeros
        const sanitizedPrice = inputPrice.replace(/[^0-9.]/g, "").replace(/^0+/, "");

        // limit to 2 decimal points
        const roundedPrice = Math.round(parseFloat(sanitizedPrice) * 100) / 100;
        setPrice(roundedPrice);
    };

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!image || !imgUrl || !name || !description || !price || !category) {
            setAlert({ status: "warning", title: "Invalid fields", description: "Please fill in all fields" })
            setTimeout(() => {
                setAlert(null)
            }, 3000)
            return;
        }

        const formData = new FormData()
        formData.append('name', name)
        formData.append('description', description)
        formData.append('price', price)
        formData.append('category', category)
        formData.append('image', image)
        
        try {
            setIsLoading(true)
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/product/`, {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'authorization': `Bearer ${token}`
                    },
                    body: formData
                }
            )
            const data = await response.json()
            setIsLoading(false)
            if (data?.message) setIsDisabled(true)
            setAlert({ 
                status: data?.message ? "success" : "error", 
                title:  data?.message ? "Product created." : "Error occurred.", 
                description: data?.message ? data.message : data.error 
            })
            setTimeout(() => {
                handleClose();
            }, 4000)
        } catch (error) {
            console.log('Error occurred in post request to products route: ', error)
            setIsLoading(false)
            setAlert({ 
                status: "error", 
                title:  "Error occurred.", 
                description: "Failed to reach server. Please try again later." 
            })
            setTimeout(() => {
                handleClose();
            }, 4000)
        }
    }

    const handleClose = () => {
        setImage(null);
        setImgUrl(null);
        setName(null);
        setDescription(null);
        setPrice(null);
        setCategory(null);
        setAlert(null);
        setIsLoading(null);
        setIsDisabled(null);
        onClose();
    }

    return (
        <>
            <Container _hover={{ cursor: "pointer" }} width="1.25rem">
                <MdLibraryAdd color="white" fontSize="1.25rem" onClick={onOpen} />
            </Container>
            <Modal isOpen={isOpen} onClose={onClose} size="md">
                <ModalOverlay />
                <ModalContent fontFamily="EB Garamond">
                    <ModalHeader fontWeight="600">Add Product</ModalHeader>
                    <ModalCloseButton onClick={handleClose}/>
                    <ModalBody>
                        <form onSubmit={handleSubmit} encType='multipart/form-data'>
                            <VStack padding="1rem 0" spacing="1rem">
                                { isLoading && <Spinner/>}
                                { alert && <Alert status={alert.status} title={alert.title} description={alert.description}/>}
                                <Image 
                                    src={ imgUrl ? imgUrl : "/default.jpg" }
                                    borderRadius="0" 
                                    objectFit="cover"
                                    alt="default image"
                                    height="256px"
                                    width="256px"
                                />
                                <label 
                                    htmlFor="imageFileUpload" className="customImageFileUpload"
                                >
                                    Change Image
                                </label>
                                <Input
                                    name="img"
                                    id="imageFileUpload"
                                    type="file"
                                    onChange={handleImg}
                                />
                                <FormControl>
                                    <FormLabel fontWeight="600">Name</FormLabel>
                                    <Input 
                                        type="text" 
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="Product Name" 
                                    />
                                </FormControl>

                                <FormControl>
                                    <FormLabel mt={4}
                                    fontWeight="600">Price</FormLabel>
                                    <NumberInput defaultValue={0} precision={2} step={0.01}
                                    onChange={(e) => handlePriceChange(e)}>
                                        <NumberInputField />
                                        <NumberInputStepper>
                                            <NumberIncrementStepper />
                                            <NumberDecrementStepper />
                                        </NumberInputStepper>
                                    </NumberInput>
                                </FormControl>

                                <FormControl>
                                    <FormLabel mt={4} fontWeight="600">Category</FormLabel>
                                    <Select placeholder="Select category" onChange={e => setCategory(e.target.value)}>
                                        <option value="Croissanterie">Croissanterie</option>
                                    </Select>
                                </FormControl>

                                <FormControl>
                                    <FormLabel mt={4} fontWeight="600">Description</FormLabel>
                                    <Textarea 
                                    onChange={(e) => setDescription(e.target.value)}placeholder="Product Description" />
                                </FormControl>
                                <CustomButton content="Create Product" type="submit" main="true" isDisabled={isDisabled || isLoading}/>
                            </VStack>
                        </form>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}

export default AddProduct
