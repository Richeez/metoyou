import { useQueryClient } from "@tanstack/react-query";
import { apiSlice } from "../../app/api/apiSlice";
import HttpErrorHandler from "../../utils/http_error_handler";
import HttpSuccessDataHandler from "../../utils/http_success_data_handler";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth",
        method: "POST",
        body: { ...credentials },
      }),
      async onfulfilled(response) {
        return HttpSuccessDataHandler.getSuccessResponseData(response);
      },
      async onrejected(error) {
        HttpErrorHandler.spitHttpErrorMsg(error);
        console.error("Login error:", error);
      },
    }),
    post: builder.mutation({
      query: (credentials) => ({
        url: "/posts/new-post",
        method: "POST",
        body: { ...credentials },
      }),
      async onfulfilled(response) {
        return HttpSuccessDataHandler.getSuccessResponseData(response);
      },
      async onrejected(error) {
        HttpErrorHandler.spitHttpErrorMsg(error);
        console.error("Post error:", error);
      },
    }),
    updateProfile: builder.mutation({
      query: (credentials) => ({
        url: "/users/profile",
        method: "PATCH",
        body: { ...credentials },
      }),

      async onfulfilled(response) {
        return HttpSuccessDataHandler.getSuccessResponseData(response);
      },
      async onrejected(error) {
        HttpErrorHandler.spitHttpErrorMsg(error);
        console.error("profile update error:", error);
      },
    }),
    like: builder.mutation({
      query: (credentials) => {
        const { postId } = credentials;

        return {
          url: `/posts/${postId}/like`,
          method: "PATCH",
        };
      },
      async onfulfilled(response) {
        return HttpSuccessDataHandler.getSuccessResponseData(response);
      },
      async onrejected(error) {
        return HttpErrorHandler.spitHttpErrorMsg(error);
      },
    }),
    deletePost: builder.mutation({
      query: (credentials) => {
        const { postId } = credentials;

        return {
          url: `/posts/delete/post?postId=${postId}`,
          method: "DELETE",
        };
      },
      async onfulfilled(response) {
        return HttpSuccessDataHandler.getSuccessResponseData(response);
      },
      async onrejected(error) {
        HttpErrorHandler.spitHttpErrorMsg(error);
        console.error("delete error:", error);
      },
    }),
    editPost: builder.mutation({
      query: (credentials) => {
        const { postId, contents } = credentials;

        return {
          url: `/posts/edit/post?postId=${postId}`,
          method: "PATCH",
          body: { ...contents },
        };
      },
      async onfulfilled(response) {
        return HttpSuccessDataHandler.getSuccessResponseData(response);
      },
      async onrejected(error) {
        HttpErrorHandler.spitHttpErrorMsg(error);
        console.error("Edit error:", error);
      },
    }),
  }),
});

// Define a custom hook to handle login and update profile
export const useAuthApi = () => {
  const queryClient = useQueryClient();

  const { useLoginMutation, useUpdateProfileMutation } = authApiSlice;

  const login = useLoginMutation({
    async onSuccess(data) {
      console.log("🚀 ~ onSuccess ~ data:", data);
      const userData = data.data; // Assuming user data is in response.data
      queryClient.setQueryData(["currentUser"], userData); // Update current user data in the cache
    },
  });

  const updateProfile = useUpdateProfileMutation({
    async onSuccess(data) {
      const updatedUserData = data.data; // Assuming updated user data is in response.data
      queryClient.setQueryData(["currentUser"], (prevData) => ({
        ...prevData, // Merge previous data with updated data
        ...updatedUserData,
      }));
    },
  });

  return { login, updateProfile };
};

export const {
  usePostMutation,
  useUploadMutation,
  useLikeMutation,
  useDeletePostMutation,
} = authApiSlice;
