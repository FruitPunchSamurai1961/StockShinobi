import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {apiUrl} from "../../utils/authConstants";
import {RootState} from "../../ts/types";
import {requestMethod} from "../../ts/enums";
import {ActiveListingResponse, StocksNewsResponse, TopStocksResponse} from "../../ts/interfaces";
import queryString from 'query-string';

export const stockApi = createApi({
    reducerPath: 'stockApi',
    keepUnusedDataFor: 500,
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
    })
});


export const {useGetActiveStocksListQuery, useGetNewsForStocksQuery, useGetTopGainersLosersStockListQuery} = stockApi;