import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure, Text, VStack, Badge, HStack, Divider } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { BsFillCalendar2CheckFill } from "react-icons/bs"
import { useDispatch, useSelector } from "react-redux";
import Order from "./Order";
import CustomButton from "../Button";
import { resetOrder } from "@/redux/orderReducer";
import Alert from "../Alert";

function OrdersPopUp() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();

  const setClose = () => {
    onClose();
    dispatch(resetOrder());
  };

  const [responseMessage, setResponseMessage] = useState(null);

  const ordersList = useSelector((state) => (state.order));
  const { user, token } = useSelector((state) => (state.auth));
  const [orders, setOrders] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, [onOpen])

  const updateOrders = async () => {
    if (!ordersList.orders.length) return;
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/order/complete`, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            orders: ordersList.orders
          })
      })
      
      const data = await response.json();
      if (data?.message) {
        await fetchOrders();
        setClose();
      } else {
        setResponseMessage({ status: "error", title: "Error", message: data?.error });
        setTimeout(() => {
          setResponseMessage(null);
        }, 4000);
        setClose();
      }
    } catch (error) {
      setResponseMessage({ status: "error", title: "Error", message: "Error occurred in reaching server." });
      setTimeout(() => {
        setResponseMessage(null);
      }, 4000);
      setClose();
    }
  }

  const fetchOrders = async () => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/order?userId=${user.id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${token}`
            },
        });
        const data = await response.json();
        if (data?.message) {
          console.log(data.data);
          setOrders(data.data);
        };
    } catch (error) {
        console.error(error);
    }
  }

  return (
    <>
      <Text _hover={{ textDecor: "underline", cursor: "pointer" }} onClick={onOpen}>View Order History</Text>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Order History</ModalHeader>
          <ModalCloseButton onClick={setClose}/>
          <ModalBody>
            { responseMessage && <Alert description={responseMessage.message} status={responseMessage.status} title={responseMessage.title}/> }
            <VStack width="100%" spacing="1rem">
                {
                  orders && orders.map((order) => <Order key={order.id} order={order} user={user} />)
                }
            </VStack>
          </ModalBody>
          <ModalFooter>

            { ordersList.orders.length > 0 && <CustomButton content="Submit" main="true" borderRadius="1rem"
            onClick={updateOrders}
            />}

            <Button marginLeft="1rem" onClick={setClose} borderRadius="0">Close</Button>

          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default OrdersPopUp