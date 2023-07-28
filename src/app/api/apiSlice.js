/* eslint-disable no-unused-vars */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { setCredentials } from "../../manager/auth/authSlice"

const baseQuery = fetchBaseQuery({
    baseUrl: "https://metoyou-api.vercel.app/api",
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.token
        if (token) {
            headers.set("authorization", `Bearer ${token}`)
        }

        return headers
    }
})

const refreshAccessToken = async (api, extraOptions) => {
    const refreshResult = await baseQuery("/refresh", api, extraOptions)
    console.log("New Token:", refreshResult.data)

    if (refreshResult?.data) {
        const user = api.getState().auth.user

        //? Store new token
        api.dispatch(setCredentials({ ...refreshResult.data, user }))
        return refreshResult.data// Return the new access token
    }

    return null // Return null if refresh fails
}

export const baseQueryWithReAuth = async (args, api, extraOptions) => {
    let result = null
    let retry = false
    let newToken = null // Initialize newToken variable


    try {
        result = await baseQuery(args, api, extraOptions)
    } catch (error) {
        // Handle various error scenarios
        if (error.status === 403) {
            console.log("Access forbidden. Refreshing token...")
            newToken = await refreshAccessToken(api, extraOptions)

            if (newToken) {
                console.log("Retrying original request with new token...")
                // Retry the original query with the new access token
                retry = true
            } else {
                let logged;

                if (newToken?.error?.status === 403) {
                    logged = newToken?.error?.data?.message
                    logged = "Your Log in session has expired! "

                }
                return logged;
            }
        } else {
            // Handle other errors, you can also throw it to let the upper layer handle it
            throw error
        }
    }

    if (retry) {
        // Set the new access token in the headers before retrying the original request
        api.setHeader("authorization", `Bearer ${newToken}`)
        result = await baseQuery(args, api, extraOptions)
    }

    return result
}


export const apiSlice = createApi({
    baseQuery: baseQueryWithReAuth,
    endpoints: builder => ({})
})