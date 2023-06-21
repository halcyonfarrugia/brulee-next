import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure, Text, VStack, Spinner, } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Query from "./Query";
import Alert from "../Alert";

function QueryPopUp() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState(null);

  const { user, token } = useSelector((state) => (state.auth));
  const [queries, setQueries] = useState(null);

  useEffect(() => {
    fetchQueries();
  }, [onOpen])

  const fetchQueries = async () => {
    setIsLoading(true);
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/query/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${token}`
            },
        });
        const data = await response.json();
        if (data?.message) {
          setQueries(data.data);
        };
        setIsLoading(false);
    } catch (error) {
        setIsLoading(false);
        console.error(error);
    }
  }

  return (
    <>
      <Text _hover={{ textDecor: "underline", cursor: "pointer" }} onClick={onOpen}>View Queries</Text>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Queries</ModalHeader>
          <ModalCloseButton onClick={onClose}/>
          <ModalBody>
            <VStack width="100%" spacing="1rem">
                { isLoading && <Spinner/> }
                {
                  queries && queries.map((query) => <Query key={query.id} query={query} user={user} />)
                }
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button marginLeft="1rem" onClick={onClose} borderRadius="0">Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default QueryPopUp