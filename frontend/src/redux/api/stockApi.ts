import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {apiUrl} from "../../utils/authConstants";
import {
    AdjustedTimeSeriesStock,
    DailyAdjustedData,
    MetaData,
    DailyAdjustedTimeSeries,
    RootState
} from "../../ts/types";
import {requestMethod} from "../../ts/enums";
import {ActiveListingResponse, DailyAdjustedResponse, StocksNewsResponse, TopStocksResponse} from "../../ts/interfaces";
import queryString from 'query-string';


const parseDailyAdjustedResponse = (response: any): DailyAdjustedResponse => {
    const parsedDailyAdjustedData = response["dailyAdjustedData"];
    const parsedMetaData = parsedDailyAdjustedData["Meta Data"];
    const parsedDailyAdjustedTimeSeries = parsedDailyAdjustedData["Time Series (Daily)"];

    const metaData: MetaData = {
        symbol: parsedMetaData["1. Information"],
        information: parsedMetaData["2. Symbol"],
        lastRefreshed: parsedMetaData["3. Last Refreshed"]
    }


    let adjustedTimeSeriesStockArray: AdjustedTimeSeriesStock[] = [];

    for (const date of Object.keys(parsedDailyAdjustedTimeSeries)) {
        const stockData = parsedDailyAdjustedTimeSeries[date];
        adjustedTimeSeriesStockArray.push({
            date: date,
            open: Number(stockData["1. open"]),
            high: Number(stockData["2. high"]),
            low: Number(stockData["3. low"]),
            close: Number(stockData["4. close"]),
            adjustedClose: Number(stockData["5. adjusted close"]),
            volume: Number(stockData["6. volume"]),
            dividendAmount: Number(stockData["7. dividend amount"])
        });
    }


    let dailyAdjustedTimeSeries: DailyAdjustedTimeSeries = {
        adjustedTimeSeriesStockArray: adjustedTimeSeriesStockArray
    }


    const dailyAdjustedData: DailyAdjustedData = {
        metaData: metaData,
        dailyAdjustedTimeSeries: dailyAdjustedTimeSeries
    }

    return {
        dailyAdjustedData: dailyAdjustedData
    }
}


export const stockApi = createApi({
    reducerPath: 'stockApi',
    keepUnusedDataFor: 5000,
    baseQuery: fetchBaseQuery({
        baseUrl: `${apiUrl}/stocks`,
        prepareHeaders: (headers: Headers, {getState}) => {
            const token = (getState() as RootState).context.token;
            if (token) {
                headers.set("authorization", `Bearer ${token}`)
                return headers
            }
        }
    }),
    endpoints: (builder) => ({
        getActiveStocksList: builder.query<ActiveListingResponse, void>({
            query: () => ({
                url: `/list`,
                method: requestMethod.GET,
            }),
        }),
        getTopGainersLosersStockList: builder.query<TopStocksResponse, void>({
            query: () => ({
                url: `/ranking`,
                method: requestMethod.GET,
            }),
        }),
        getNewsForStocks: builder.query<StocksNewsResponse, { tickers: string[] }>({
            query: ({tickers}) => ({
                url: `/news?${queryString.stringify({tickers: tickers}, {arrayFormat: "comma"})}`,
                method: requestMethod.GET
            }),
        }),
        getDailyAdjustedDataForStock: builder.query<DailyAdjustedResponse | undefined, { symbol: string }>({
            query: ({symbol}) => ({
                url: `/timeseries/daily-adjusted`,
                method: requestMethod.GET,
                params: {
                    symbol: symbol
                },
            }),
            transformResponse: (response: string): DailyAdjustedResponse | undefined => {
                if (response == null) {
                    return undefined
                }
                return parseDailyAdjustedResponse(response)
            },
        }),
    })
});


export const {
    useGetActiveStocksListQuery,
    useGetNewsForStocksQuery,
    useGetTopGainersLosersStockListQuery,
    useGetDailyAdjustedDataForStockQuery
} = stockApi;