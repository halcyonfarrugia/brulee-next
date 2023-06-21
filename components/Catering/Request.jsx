import { HStack, VStack, Text, Badge, Divider, Button } from "@chakra-ui/react";
import { BsFillCalendar2CheckFill } from "react-icons/bs"
import { useDispatch, useSelector } from "react-redux";
import { toggleRequest } from "@/redux/cateringReducer";

const Request = ({ request, user }) => {
    const { requests } = useSelector((state) => (state.catering))
    const format24Hour = (scheduledTime) => {
        let date = new Date(scheduledTime);
        let hours = (date.getUTCHours() + 10) % 24;
        let minutes = date.getUTCMinutes();
        hours = hours < 10 ? '0' + hours : hours;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        return hours + ':' + minutes;
    };

    const formatDate = (scheduledTime) => {
        let date = new Date(scheduledTime);
        let day = date.getUTCDate();
        let month = date.getUTCMonth() + 1; // Months are 0 based in JavaScript
        let year = date.getUTCFullYear().toString().substr(-2); // Get last 2 digits of year
        day = day < 10 ? '0' + day : day;
        month = month < 10 ? '0' + month : month;
        return day + '/' + month + '/' + year;
    };

    const dispatch = useDispatch();

    return (
        <HStack width="100%" key={request.id}>
            <VStack width="90%" align="start">
                <Text fontSize="0.8rem"><b>ID: </b><Badge colorScheme="orange">{request.id}</Badge></Text>
                <HStack>
                    <Text fontSize="0.75rem">
                        <b>Status: </b><Badge colorScheme={ request.status ? "green" : "yellow" }>{ request.status ? "Complete" : "Incomplete" }</Badge>
                    </Text>
                    <Text fontSize="0.75rem">
                        <b>Schedule Time: </b><Badge colorScheme="blue">{format24Hour(request.scheduledTime)}, {formatDate(request.scheduledTime)}</Badge>
                    </Text>
                </HStack>
                <Text fontSize="0.75rem" >
                    <b>Description: </b><br/>
                    <Text height="4rem" overflow="scroll">{request.description}</Text>
                </Text>
                <Divider/>
            </VStack>
            { user?.isAdmin && <Button 
                colorScheme={ requests?.includes(request.id) ? "blue" : ( request.status ? "green" : "red" ) } 
                isDisabled={request.status}
                onClick={() => dispatch(toggleRequest(request.id))}
            >
                <BsFillCalendar2CheckFill fontSize="1rem"/>
            </Button> }
        </HStack>
    );
}

export default Request;