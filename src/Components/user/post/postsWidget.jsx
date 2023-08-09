/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/rules-of-hooks */
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentPost, setPosts } from "../../../manager/auth/authSlice";
import {
  useGetUserPostsQuery,
  useGetUsersPostsQuery,
} from "../../../manager/usersReq/usersApiSlice";
import { useEffect } from "react";
import Post from "./Post";
import { Fetching } from "../../../svgs";

const PostsWidget = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch();

  const posts = useSelector(selectCurrentPost);

  const {
    data: post,
    isLoading,
    isError,
  } = isProfile ? useGetUserPostsQuery(userId) : useGetUsersPostsQuery();
  console.log("🚀 ~ file: postsWidget.jsx:23 ~ PostsWidget ~ post:", post);

  useEffect(() => {
    if (post) {
      dispatch(setPosts({ posts: post }));
    }
  }, [post, dispatch]);

  if (isLoading) {
    return (
      <div className="loading-div">
        <Fetching />
      </div>
    );
  }

  if (isError) {
    return (
      <div style={{ textAlign: "center", width: "100%", fontSize: "1.2rem" }}>
        Error: Failed to fetch posts
      </div>
    );
  }

  if (!posts?.length) {
    return (
      <div style={{ textAlign: "center", width: "100%", fontSize: "1.2rem" }}>
        No posts found.
      </div>
    );
  }

  return (
    <>
      {posts
        ?.map(
          ({
            _id,
            userId,
            username,
            description,
            location,
            picsPath,
            userPicsPath,
            likes,
            comments,
            following,
          }) => (
            <>
              <div key={`${_id}-${userId}`} className="item">
                {console.log(
                  "🚀 ~ file: postsWidget.jsx:58 ~ PostsWidget ~ posts:",
                  posts
                )}{" "}
                <Post
                  postId={_id}
                  postUserId={userId}
                  username={username}
                  description={description}
                  location={location}
                  picsPath={picsPath}
                  userPicsPath={userPicsPath}
                  likes={likes}
                  comments={comments}
                  following={following}
                />
              </div>
            </>
          )
        )
        .reverse()}
    </>
  );
};
//
export default PostsWidget;
