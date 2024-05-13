import { apiSlice } from "../../app/api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    post: builder.mutation({
      query: (credentials) => ({
        url: "/posts/new-post",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    updateProfile: builder.mutation({
      query: (credentials) => ({
        url: "/users/profile",
        method: "PATCH",
        body: { ...credentials },
      }),
    }),
    like: builder.mutation({
      query: (credentials) => {
        const { id, userId } = credentials;

        return {
          url: `/posts/${id}/like`,
          method: "PATCH",
          body: { userId },
        };
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
    }),
  }),
});

export const {
  useLoginMutation,
  usePostMutation,
  useUpdateProfileMutation,
  useUploadMutation,
  useLikeMutation,
  useDeletePostMutation,
} = authApiSlice;
