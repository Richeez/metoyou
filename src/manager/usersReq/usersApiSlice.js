import { apiSlice } from "../../app/api/apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getUsers: builder.query({
            query: () => "/users"
        }),
        getUserId: builder.query({
            query: (userId) => `/users/${userId}`
        }),
        getUserPosts: builder.query({
            query: (userId) => `/posts/${userId}/posts`
        }),
        getUsersPosts: builder.query({
            query: () => `/posts`
        })
    })
})

export const { useGetUsersQuery, useGetUserIdQuery, useGetUserPostsQuery, useGetUsersPostsQuery, useGetUserProfileQuery } = usersApiSlice;