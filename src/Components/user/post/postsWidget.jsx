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
import Lottie from "lottie-react";
import Empty from "../profile/empty-state.json";

const PostsWidget = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch();

  const posts = useSelector(selectCurrentPost);

  const {
    data: post,
    isLoading,
    isError,
    error,
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
    const statusCode = error?.status;
    console.log("statusCode", statusCode);

    return (
      <div style={{ textAlign: "center", width: "100%", fontSize: "1.2rem" }}>
        Error: Failed to fetch posts
      </div>
    );
  }

  if (!posts?.length) {
    return (
      <div style={{ textAlign: "center", width: "100%", fontSize: "1.2rem" }}>
        <div className="videos-cont">
          <div className="empty-cont flex-cont">
            <div className="empty-word flex-cont">
              <p className="no-post">No post(s) yet!</p>
            </div>

            <Lottie className="empty" animationData={Empty} />
          </div>
        </div>
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
