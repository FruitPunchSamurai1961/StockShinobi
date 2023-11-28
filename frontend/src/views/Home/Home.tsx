import React from "react";
import LineChart from "../../components/charts/LineChart";
import {Box, Flex, HStack} from "@chakra-ui/react";
import News from "../../components/news/News";
import {LineChartDataPoint, SearchBarOption} from "../../ts/types";
import TopStockList from "../../components/stocks/TopStockList";
import SearchBar from "../../components/searchbar/SearchBar";
import {
    useGetActiveStocksListQuery,
    useGetDailyAdjustedDataForStockQuery,
    useGetNewsForStocksQuery,
    useGetTopGainersLosersStockListQuery
} from "../../redux/api/stockApi";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {setNameState, setSymbolState} from "../../redux/home/homeSlice";
import {Carousel} from "react-responsive-carousel";
import Notes from "../../components/notes/Notes";
import {selectionOptions} from "../../ts/enums";

const Home = () => {

    const homeState = useAppSelector((state) => state.home);
    const dispatch = useAppDispatch();

    const {data: topStocksResponse} = useGetTopGainersLosersStockListQuery();
    const {data: activeStocksList} = useGetActiveStocksListQuery();
    const {data: newsFeedResponse} = useGetNewsForStocksQuery({tickers: [homeState.symbol]});
    const {data: dailyAdjustedResponse} = useGetDailyAdjustedDataForStockQuery({symbol: homeState.symbol});

    let options: SearchBarOption[] = [];

    if (activeStocksList != null) {
        options = activeStocksList.listings.map((stock) => ({value: stock.symbol, label: stock.name}));
    }

    let ytdData: LineChartDataPoint[] = [];
    let sixMonthData: LineChartDataPoint[] = [];
    let oneMonthData: LineChartDataPoint[] = [];
    let oneYearData: LineChartDataPoint[] = [];
    let allData: LineChartDataPoint[] = [];

    if (dailyAdjustedResponse != null) {
        dailyAdjustedResponse.dailyAdjustedData.dailyAdjustedTimeSeries.adjustedTimeSeriesStockArray.forEach((stock) => {
            const date = new Date(stock.date).getTime();
            const dataPoint: LineChartDataPoint = [date, stock.close];
            allData.push(dataPoint);

            if (selectionOptions.YTD <= date) {
                ytdData.push(dataPoint);
            }
            if (selectionOptions.SIX_MONTHS <= date) {
                sixMonthData.push(dataPoint);
            }
            if (selectionOptions.ONE_MONTH <= date) {
                oneMonthData.push(dataPoint);
            }
            if (selectionOptions.ONE_YEAR <= date) {
                oneYearData.push(dataPoint);
            }
        });
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
                    <LineChart allData={allData} oneYearData={oneYearData} oneMonthData={oneMonthData}
                               sixMonthData={sixMonthData} ytdData={ytdData} name={homeState.name}/>
                </Box>
                <Box flex={1} minWidth={0}>
                    <News feed={newsFeedResponse != null ? newsFeedResponse.news.feed : []}/>
                </Box>
            </HStack>
            <Box mx={20} mt={10} minWidth={0}>
                <Notes name={homeState.name} placeholder={"Write notes..."}/>
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