import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {apiUrl} from "../../utils/authConstants";
import {ActiveStock, RootState} from "../../ts/types";
import {requestMethod} from "../../ts/enums";


export const stockApi = createApi({
    reducerPath: 'stockApi',
    keepUnusedDataFor: 300,
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
        getActiveStocksList: builder.query<ActiveStock[], void>({
            query: () => ({
                url: `/list`,
                method: requestMethod.GET,
            }),
        })
    })
});


export const {useGetActiveStocksListQuery} = stockApi;