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
  console.log("🚀 ~ file: postsWidget.jsx:15 ~ PostsWidget ~ posts:", posts);

  const {
    data: post,
    isLoading,
    isError,
  } = isProfile ? useGetUserPostsQuery(userId) : useGetUsersPostsQuery();

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
    return <div>Error: Failed to fetch posts</div>;
  }

  if (!posts?.length) {
    return <div>No posts found.</div>;
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
          }) => (
            <>
              <div className="item">
                <Post
                  key={`${_id}-${username}`}
                  postId={_id}
                  postUserId={userId}
                  username={username}
                  description={description}
                  location={location}
                  picsPath={picsPath}
                  userPicsPath={userPicsPath}
                  likes={likes}
                  comments={comments}
                />
              </div>
            </>
          )
        )
        .reverse()}
    </>
  );
};

export default PostsWidget;
