/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentPost, setPosts } from "../../../manager/auth/authSlice";
import {
  useGetUserPostsQuery,
  useGetUsersPostsQuery,
} from "../../../manager/usersReq/usersApiSlice";
import Post from "./Post";
import { Fetching } from "../../../svgs";
import Lottie from "lottie-react";
import Empty from "../profile/empty-state.json";

const PostsWidget = React.memo(({ userId, isProfile = false }) => {
  const dispatch = useDispatch();
  const posts = useSelector(getCurrentPost);

  const {
    data: post,
    isLoading,
    isError,
    error,
  } = isProfile ? useGetUserPostsQuery(userId) : useGetUsersPostsQuery();

  const memoizedDispatch = useMemo(() => dispatch, [dispatch]);

  useEffect(() => {
    if (post && !posts.length) {
      memoizedDispatch(setPosts({ posts: post }));
    }
  }, [post, posts.length, memoizedDispatch]);

  if (isLoading) {
    return (
      <div className="loading-div">
        <Fetching />
      </div>
    );
  }

  if (isError) {
    const statusCode = error?.status;
    console.log("statusCode", statusCode);

    return (
      <div style={{ textAlign: "center", width: "100%", fontSize: "1.2rem" }}>
        Error: Failed to fetch posts
      </div>
    );
  }

  if (!posts.length) {
    return (
      <div
        style={{
          textAlign: "center",
          width: "100%",
          display: "flex",
          fontSize: "1.2rem",
          fontWeight: "bolder",
          lineHeight: "1.4",
        }}
        className=" post-cont fdirc aic"
      >
        <p className="no-post">No post(s) yet!</p>
        <Lottie className="empty" animationData={Empty} />
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
            // location,
            createdAt,
            picsPath,
            userPicsPath,
            likes,
            comments,
            following,
            details,
          }) => (
            <div key={`${_id}-${userId}`} className="item">
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
                timestamp={!details?.length ? createdAt : details[0].time}
              />
            </div>
          )
        )
        .reverse()}
    </>
  );
});

//? Add display name for the component
PostsWidget.displayName = "PostsWidget";

export default PostsWidget;
