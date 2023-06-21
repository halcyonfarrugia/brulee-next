import { HStack, VStack, Text, Badge, Divider, Button } from "@chakra-ui/react";

const Query = ({ query, user }) => {
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

    return (
        <HStack width="100%" key={query.id}>
            <VStack width="90%" align="start">
                <Text fontSize="0.8rem"><b>ID: </b><Badge colorScheme="orange">{query.id}</Badge></Text>
                <HStack>
                    <Text fontSize="0.75rem">
                        <b>Name: </b>{ query.firstName + ' ' + query.lastName }
                    </Text>
                    <Text fontSize="0.75rem">
                        <b>Date Created: </b><Badge colorScheme="blue">{format24Hour(query.createdAt)}, {formatDate(query.createdAt)}</Badge>
                    </Text>
                </HStack>
                <Text fontSize="0.75rem" >
                    <b>Description: </b><br/>
                    <Text height="4rem" overflow="scroll">{query.description}</Text>
                </Text>
                <Divider/>
            </VStack>
        </HStack>
    );
}

export default Query;