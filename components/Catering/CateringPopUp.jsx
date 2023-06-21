import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure, Text, VStack, Spinner, } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Request from "./Request";
import CustomButton from "../Button";
import { resetRequests } from "@/redux/cateringReducer";
import Alert from "../Alert";

function CateringPopUp() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();

  const setClose = () => {
    onClose();
    dispatch(resetRequests());
  };

  const [isLoading, setIsLoading] = useState(null);

  const [responseMessage, setResponseMessage] = useState(null);

  const requestsList = useSelector((state) => (state.catering));
  const { user, token } = useSelector((state) => (state.auth));
  const [requests, setRequests] = useState(null);

  useEffect(() => {
    fetchRequests();
  }, [onOpen])

  const updateRequests = async () => {
    if (!requestsList.requests.length) return;
    try {
        setIsLoading(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/catering/complete`, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            requests: requestsList.requests,
          }),
      })
      
      const data = await response.json();
      if (data?.message) {
        await fetchRequests();
        setClose();
        setIsLoading(false);
      } else {
        setIsLoading(false);
        setResponseMessage({ status: "error", title: "Error", message: data?.error });
        setTimeout(() => {
          setResponseMessage(null);
        }, 4000);
        setClose();
      }
    } catch (error) {
        setIsLoading(false);
      setResponseMessage({ status: "error", title: "Error", message: "Error occurred in reaching server." });
      setTimeout(() => {
        setResponseMessage(null);
      }, 4000);
      setClose();
    }
  }

  const fetchRequests = async () => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/catering?userId=${user.id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${token}`
            },
        });
        const data = await response.json();
        if (data?.message) {
          setRequests(data.data);
        };
        setIsLoading(false);
    } catch (error) {
        setIsLoading(false);
        console.error(error);
    }
  }

  return (
    <>
      <Text _hover={{ textDecor: "underline", cursor: "pointer" }} onClick={onOpen}>View Catering History</Text>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Catering History</ModalHeader>
          <ModalCloseButton onClick={setClose}/>
          <ModalBody>
            { responseMessage && <Alert description={responseMessage.message} status={responseMessage.status} title={responseMessage.title}/> }
            <VStack width="100%" spacing="1rem">
                { isLoading && <Spinner/> }
                {
                  requests && requests.map((request) => <Request key={request.id} request={request} user={user} />)
                }
            </VStack>
          </ModalBody>
          <ModalFooter>

            { requestsList.requests.length > 0 && <CustomButton content="Submit" main="true" borderRadius="1rem"
            onClick={updateRequests}
            />}

            <Button marginLeft="1rem" onClick={setClose} borderRadius="0">Close</Button>

          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default CateringPopUp