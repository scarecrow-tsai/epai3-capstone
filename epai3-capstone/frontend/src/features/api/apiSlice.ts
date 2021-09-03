import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export interface LoginResponse {
    user: string
    token: string
}

export interface LoginRequest {
    username: string
    password: string
}

// Define our single API slice object
export const apiSlice = createApi({
    // The cache reducer expects to be added at `state.api` (already default - this is optional)
    reducerPath: "auth",
    // All of our requests will have URLs starting with the base below.
    baseQuery: fetchBaseQuery({baseUrl: process.env.REACT_APP_BACKEND_URL}),
    // The "endpoints" represent operations and requests for this server
    endpoints: (builder) => ({
        //                            ResultType     QueryArg
        authLogin: builder.mutation<LoginResponse, LoginRequest>({
            query: credentials => ({
                url: "/api/token",
                method: "POST",
                body: JSON.stringify(`grant_type=&username=${credentials.username}&password=${credentials.password}&scope=&client_id=&client_secret=`),
                headers: {"Content-Type": "application/x-www-form-urlencoded"}
            })
        })
    })

})

export const { useAuthLoginMutation } = apiSlice