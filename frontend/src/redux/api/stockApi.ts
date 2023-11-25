import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {apiUrl} from "../../utils/authConstants";
import {ActiveStock, RootState} from "../../ts/types";


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
            query: () => `/list`,
        })
    })
});


export const {useGetActiveStocksListQuery} = stockApi;