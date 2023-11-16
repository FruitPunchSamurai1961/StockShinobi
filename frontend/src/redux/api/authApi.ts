import {requestMethod} from "../../ts/enums";
import {LoginResponse, SignupResponse} from "../../ts/interfaces";
import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {apiUrl} from "../../utils/authConstants";

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: apiUrl
    }),
    endpoints: (builder) => ({
        login: builder.mutation<LoginResponse, { email: string, password: string }>(
            {
                query: ({email, password}) => ({
                    url: '/tokens/authentication',
                    method: requestMethod.POST,
                    body: {email, password}
                })
            }
        ),
        signup: builder.mutation<SignupResponse, { name: string, email: string, password: string }>(
            {
                query: ({name, email, password}) => ({
                    url: '/users',
                    method: requestMethod.POST,
                    body: {name, email, password}
                })
            }
        )
    })
})


export const {
    useLoginMutation,
    useSignupMutation
} = authApi;

export const {
    endpoints: {login, signup},
} = authApi;