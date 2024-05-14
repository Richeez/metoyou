import { apiSlice } from "../../app/api/apiSlice";
import HttpErrorHandler from "../../utils/http_error_handler";
import HttpSuccessDataHandler from "../../utils/http_success_data_handler";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "/users",
      async onfulfilled(response) {
        //? Extract data from successful response
        return HttpSuccessDataHandler.getSuccessResponseData(response);
      },
      async onrejected(error) {
        HttpErrorHandler.spitHttpErrorMsg(error);
      },
    }),
    getUsersById: builder.query({
      query: (userIds) => ({
        url: "/users",
        method: "GET", // Use POST method to send data in the request body
        body: { userIds: Array.isArray(userIds) ? userIds : [userIds] }, // Send userIds in the request body
      }),
      async onfulfilled(response) {
        //? Extract data from successful response
        return HttpSuccessDataHandler.getSuccessResponseData(response);
      },
      async onrejected(error) {
        HttpErrorHandler.spitHttpErrorMsg(error);
      },
    }),
    getUserId: builder.query({
      query: (userId) => `/users/${userId}`,
      async onfulfilled(response) {
        //? Extract data from successful response
        return HttpSuccessDataHandler.getSuccessResponseData(response);
      },
      async onrejected(error) {
        HttpErrorHandler.spitHttpErrorMsg(error);
      },
    }),
    getUserPosts: builder.query({
      query: (userId) => `/posts/${userId}/posts`,
      async onfulfilled(response) {
        // try {
        // Extract data from successful response
        return HttpSuccessDataHandler.getSuccessResponseData(response);
        // } catch (error) {
        // Handle errors
        // console.error("Error extracting response data:", error.message);

        // throw new Error("Error processing response");
        // }
      },
      async onrejected(error) {
        // console.log("error", error);
        HttpErrorHandler.spitHttpErrorMsg(error);
        console.error("fetch post error:", error);
        // Throw the error to propagate it
        // throw new Error(error.message || "Login failed");
        // throw new Error(errorMessage);
      },
    }),
    getUsersPosts: builder.query({
      query: () => `/posts`,
      async onfulfilled(response) {
        //? Extract data from successful response
        return HttpSuccessDataHandler.getSuccessResponseData(response);
      },
      async onrejected(error) {
        HttpErrorHandler.spitHttpErrorMsg(error);
      },
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
