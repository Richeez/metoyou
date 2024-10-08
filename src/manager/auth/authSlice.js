import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { user: {}, token: null, posts: [] },
  reducers: {
    setCredentials: (state, action) => {
      const { user } = action.payload;
      state.user = user;
    },
    setToken: (state, action) => {
      const accessToken = action.payload;
      state.token = accessToken;
    },
    logOut: (state) => {
      state.user = null;
      state.token = null;
    },
    setFollowers: (state, action) => {
      const { friends } = action.payload;
      if (state.user) {
        state.user.friends = friends;
      } else {
        console.error("user friends non-existent :(");
      }
    },
    setPosts: (state, action) => {
      const posts = action.payload.posts;
      state.posts = posts;
    },
    setPost: (state, action) => {
      const updatedPosts = state.posts.map((currentPost) => {
        if (currentPost._id === action.payload.post._id) {
          return action.payload.post;
        }
        return currentPost;
      });
      state.posts = updatedPosts;
    },
    // ,
    // navigateToLogin: () => {
    //   navigate("/token-expired"); // Example navigation action
    // },
  },
});

export const {
  setCredentials,
  logOut,
  setFollowers,
  setPost,
  setPosts,
  setToken,
} = authSlice.actions;
export default authSlice.reducer;
export const getCurrentUser = (state) => state?.auth?.user;
export const getCurrentUserId = (state) => state?.auth?.user?._id;
export const getCurrentToken = (state) => state?.auth?.token;
export const getCurrentPost = (state) => state?.auth?.posts;
