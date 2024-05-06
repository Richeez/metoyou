import { apiSlice } from "../../app/api/apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "/users",
    }),
    getUsersById: builder.query({
      query: (userIds) => ({
        url: "/users",
        method: "GET", // Use POST method to send data in the request body
        body: { userIds: Array.isArray(userIds) ? userIds : [userIds] }, // Send userIds in the request body
      }),
    }),
    getUserId: builder.query({
      query: (userId) => `/users/${userId}`,
    }),
    getUserPosts: builder.query({
      query: (userId) => `/posts/${userId}/posts`,
    }),
    getUsersPosts: builder.query({
      query: () => `/posts`,
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserIdQuery,
  useGetUserPostsQuery,
  useGetUsersPostsQuery,
  useGetUserProfileQuery,
  useGetUsersByIdQuery,
} = usersApiSlice;
