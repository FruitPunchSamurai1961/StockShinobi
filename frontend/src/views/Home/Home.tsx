import React from "react";
import LineChart from "../../components/charts/LineChart";
import {Box, Flex, HStack} from "@chakra-ui/react";
import News from "../../components/news/News";
import {SearchBarOption} from "../../ts/types";
import TopStockList from "../../components/stocks/TopStockList";
import SearchBar from "../../components/searchbar/SearchBar";
import {
    useGetActiveStocksListQuery,
    useGetNewsForStocksQuery,
    useGetTopGainersLosersStockListQuery
} from "../../redux/api/stockApi";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {setNameState, setSymbolState} from "../../redux/home/homeSlice";
import {Carousel} from "react-responsive-carousel";
import Notes from "../../components/notes/Notes";

const Home = () => {

    const homeState = useAppSelector((state) => state.home);
    const dispatch = useAppDispatch();

    const {data: topStocksResponse} = useGetTopGainersLosersStockListQuery();
    const {data: activeStocksList} = useGetActiveStocksListQuery();
    const {data: newsFeedResponse} = useGetNewsForStocksQuery({tickers: [homeState.symbol]});

    let options: SearchBarOption[] = [];

    if (activeStocksList != null) {
        options = activeStocksList.listings.map((stock) => ({value: stock.symbol, label: stock.name}));
    }

    const handleSearchBarOptionChange = (newValue: SearchBarOption | null) => {
        if (newValue) {
            dispatch(setNameState({newNameValue: newValue.label}));
            dispatch(setSymbolState({newSymbolValue: newValue.value}));
        }
    }

    return (
        <Flex direction={"column"}>
            <SearchBar options={options} isMulti={false} handleSingleSelectOptionChange={handleSearchBarOptionChange}
                       windowThreshold={10}
                       name={"stock"} placeholder={"Select a stock"}/>
            <HStack>
                <Box flex={1} pr={4}>
                    <LineChart/>
                </Box>
                <Box flex={1} minWidth={0}>
                    <News feed={newsFeedResponse != null ? newsFeedResponse.news.feed : []}/>
                </Box>
            </HStack>
            <Box mx={20} mt={10} minWidth={0}>
                <Notes name={"notes"} placeholder={"Write notes..."}/>
            </Box>
            <Box mt={10} flex={1}>
                <Carousel showStatus={false} showThumbs={false}>
                    <TopStockList title="Gainers"
                                  stocks={topStocksResponse != null ? topStocksResponse.ranking.top_gainers : []}/>
                    <TopStockList title="Losers"
                                  stocks={topStocksResponse != null ? topStocksResponse.ranking.top_losers : []}/>
                    <TopStockList title="Most Traded"
                                  stocks={topStocksResponse != null ? topStocksResponse.ranking.most_actively_traded : []}/>
                </Carousel>
            </Box>
        </Flex>
    );
};

export default Home;