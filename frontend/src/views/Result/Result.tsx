import React from "react";
import LineChart from "../../components/charts/LineChart";
import {Box, Flex, HStack} from "@chakra-ui/react";
import News from "../../components/news/News";
import {TopStock} from "../../ts/types";
import TopStockList from "../../components/stocks/TopStockList";
import SearchBar from "../../components/searchbar/SearchBar";


// Sample data
const gainersData: TopStock[] = [
    {
        ticker: "AAPL",
        price: 150.25,
        change_amount: 5.75,
        change_percentage: 3.98,
        volume: 1200000,
    },
    // Add more gainers as needed
];

const losersData: TopStock[] = [
    {
        ticker: "GOOGL",
        price: 2800.10,
        change_amount: -15.25,
        change_percentage: -0.54,
        volume: 800000,
    },
    // Add more losers as needed
];

const mostTradedData: TopStock[] = [
    {
        ticker: "MSFT",
        price: 350.75,
        change_amount: 2.30,
        change_percentage: 0.66,
        volume: 2000000,
    },
    // Add more most traded as needed
];

const Result = () => {
    return (
        <Flex direction={"column"}>
            <text>Stock Name</text>
            <HStack>
                <Box flex={1} pr={4}>
                    <LineChart/>
                </Box>
                <Box flex={1}>
                    <News/>
                </Box>
            </HStack>

            <Box flex={1}>
                <TopStockList title="Gainers" stocks={gainersData}/>
                <TopStockList title="Losers" stocks={losersData}/>
                <TopStockList title="Most Traded" stocks={mostTradedData}/>
            </Box>
        </Flex>
    );
};

export default Result;