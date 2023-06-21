import { HStack, VStack, Text, Badge, Divider, Button } from "@chakra-ui/react";
import { BsFillCalendar2CheckFill } from "react-icons/bs"
import { useDispatch, useSelector } from "react-redux";
import { toggleOrder } from "@/redux/orderReducer";

const Order = ({ order, user }) => {
    const { orders } = useSelector((state) => (state.order))
    console.log(orders);
    const format24Hour = (pickUp) => {
        let date = new Date(pickUp);
        let hours = (date.getUTCHours() + 10) % 24;
        let minutes = date.getUTCMinutes();
        hours = hours < 10 ? '0' + hours : hours;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        return hours + ':' + minutes;
    };

    const formatDate = (pickUp) => {
        let date = new Date(pickUp);
        let day = date.getUTCDate();
        let month = date.getUTCMonth() + 1; // Months are 0 based in JavaScript
        let year = date.getUTCFullYear().toString().substr(-2); // Get last 2 digits of year
        day = day < 10 ? '0' + day : day;
        month = month < 10 ? '0' + month : month;
        return day + '/' + month + '/' + year;
    };

    const dispatch = useDispatch();

    return (
        <HStack width="100%" key={order.id}>
            <VStack width="90%" align="start">
                <Text fontSize="0.8rem"><b>ID: </b><Badge colorScheme="orange">{order.id}</Badge></Text>
                <HStack>
                    <Text fontSize="0.75rem">
                        <b>Status: </b><Badge colorScheme={ order.status ? "green" : "yellow" }>{ order.status ? "Complete" : "Incomplete" }</Badge>
                    </Text>
                    <Text fontSize="0.75rem">
                        <b>Pick Up: </b><Badge colorScheme="blue">{format24Hour(order.pickUp)}, {formatDate(order.pickUp)}</Badge>
                    </Text>
                </HStack>
                <Text fontSize="0.75rem">
                    <b>Items: </b>
                    {
                        order.items.map((item) => <span key={item.name}>{item.quantity}x {item.name}, </span>)
                    }
                </Text>
                <Divider/>
            </VStack>
            { user?.isAdmin && <Button 
                colorScheme={ orders?.includes(order.id) ? "blue" : ( order.status ? "green" : "red" ) } 
                isDisabled={order.status}
                onClick={() => dispatch(toggleOrder(order.id))}
            >
                <BsFillCalendar2CheckFill fontSize="1rem"/>
            </Button> }
        </HStack>
    );
}

export default Order;