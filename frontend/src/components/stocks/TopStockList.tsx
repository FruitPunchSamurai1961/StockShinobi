import React from "react";
import {Box, Table, Tbody, Td, Text, Th, Thead, Tr} from "@chakra-ui/react";
import {TopStockListProps} from "../../ts/interfaces";

const TopStockList: React.FC<TopStockListProps> = ({title, stocks}) => {
    return (
        <Box>
            <Text fontSize="xl" fontWeight="bold" mb={4}>
                {title}
            </Text>
            <Table variant="striped" colorScheme="teal">
                <Thead>
                    <Tr>
                        <Th>Ticker</Th>
                        <Th>Price</Th>
                        <Th>Change Amount</Th>
                        <Th>Change Percentage</Th>
                        <Th>Change Volume</Th>
                    </Tr>
                </Thead>
                {stocks != null ?
                    <Tbody>
                        {stocks.map((stock, index) => (
                            <Tr key={index}>
                                <Td>{stock.ticker}</Td>
                                <Td>{stock.price}</Td>
                                <Td>{stock.change_amount}</Td>
                                <Td>{stock.change_percentage}</Td>
                                <Td>{stock.volume}</Td>
                            </Tr>
                        ))}
                    </Tbody>
                    : null}
            </Table>
        </Box>
    );
};

export default TopStockList;
