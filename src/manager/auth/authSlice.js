import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: { user: null, token: null, posts: [] },
    reducers: {
        setCredentials: (state, action) => {
            const { rest } = action.payload;
            state.user = rest;
            console.log("first rest", rest)
        },
        setToken: (state, action) => {
            const accessToken = action.payload;
            console.log("🚀 ~ file: authSlice.js:14 ~ action.payload:", action.payload)
            console.log("accessToken", accessToken)
            state.token = accessToken;
        },
        logOut: (state) => {
            state.user = null
            state.token = null
        },
        setFollowers: (state, action) => {
            const { friends } = action.payload;
            if (state.user) {
                state.user.friends = friends
            } else {
                console.error("user friends non-existent :(")
            }

        },
        setPosts: (state, action) => {
            const posts = action.payload.posts;
            state.posts = posts
        },
        setPost: (state, action) => {
            const updatedPosts = state.posts.map((currentPost) => {

                if (currentPost._id === action.payload.post._id) return action.payload.post;
                return currentPost
            })
            state.posts = updatedPosts
        }
    },
})

export const { setCredentials, logOut, setFollowers, setPost, setPosts, setToken } = authSlice.actions
export default authSlice.reducer
export const selectCurrentUser = (state) => state?.auth?.user
export const selectCurrentUserId = (state) => state?.auth?.user?._id
export const selectCurrentToken = (state) => state?.auth?.token
export const selectCurrentPost = (state) => state?.auth?.posts