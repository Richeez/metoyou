/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import { AiFillLike } from "react-icons/ai";
import { BiShareAlt } from "react-icons/bi";
import { BsBookmark, BsThreeDots } from "react-icons/bs";
import { FaRegComment } from "react-icons/fa";
import Profile from "../profile/profile";
import { StyledPost } from "./styledPost";

import { useDispatch, useSelector } from "react-redux";
import { getCurrentUserId, setPost } from "../../../manager/auth/authSlice";

import { useLikeMutation } from "../../../manager/auth/authApiSlice";
import Comment from "../widgets/comments/Comment";
import { useEffect, useState } from "react";
import { useDynamicDate } from "../../../constants/reusables";
import EndPoints from "../../../app/api/http/endPoints";

const Post = ({
  postId,
  postUserId,
  username,
  description,
  // location,
  picsPath,
  userPicsPath,
  likes,
  comments,
  followers,
  timestamp,
}) => {
  const name = username ? `${username}` : "username";
  const dispatch = useDispatch();
  const [isComments, setIsComments] = useState(false);
  const loggedInUserId = useSelector(getCurrentUserId);
  const isLiked = Boolean(likes[loggedInUserId]);
  const likeCount = Object.keys(likes).length;
  const [like] = useLikeMutation();
  const formattedDate = useDynamicDate(timestamp);

  useEffect(() => {}, [isLiked]);

  const handleLike = async () => {
    const credentials = {
      userId: loggedInUserId,
      id: postId,
    };
    try {
      // Assuming you have the necessary data for the like in a "credentials" object
      const updatedPost = await like(credentials).unwrap();
      dispatch(setPost({ post: updatedPost }));
    } catch (error) {
      console.error("Like error:", error);
      // Handle error here
    }
  };
  const handleComment = async () => {
    setIsComments((prev) => !prev);
  };

  return (
    <StyledPost>
      <div className="profile">
        <Profile img={userPicsPath} id={postUserId} profile size={"60px"} />
        <div className="text">
          <p>{name}</p>
          <p>Published: {formattedDate?.ago}</p>
        </div>
        <BsThreeDots className="icon" />
      </div>
      <div className="post">
        {picsPath.length !== 0 && (
          <div className="img-wrapper">
            <img src={picsPath[0]?.url} alt="post" />
          </div>
        )}
        <p className="desc">{description}</p>

        <div className="icons_wrapper">
          <div className="left-icons">
            <div className="like">
              <AiFillLike
                onClick={handleLike}
                style={{
                  color: `${
                    isLiked ? "var(--blueViolet)" : "var(--color-gray)"
                  } `,
                }}
                className="icon"
              />{" "}
              <p>{likeCount}</p>
            </div>
            <FaRegComment onClick={handleComment} className="icon" />
            <BiShareAlt className="icon" />
          </div>
          <div className="right_icons">
            <BsBookmark className="icon" />
          </div>
        </div>
        <div className="engagements">
          <div className="items_wrapper">
            <div className="img_cont">
              <div className="img-wrapper">
                <img
                  src={`${
                    followers
                      ? `${EndPoints.ROOT_DOMAIN}
/assets/${followers}`
                      : "/default-user.png"
                  }`}
                  alt="avatar"
                />
              </div>
              <div className="img-wrapper">
                <img
                  src={`${
                    followers
                      ? `${EndPoints.ROOT_DOMAIN}
/assets/${followers}`
                      : "/default-user.png"
                  }`}
                  alt="avatar"
                />
              </div>
              <div className="img-wrapper">
                <img
                  src={`${
                    followers
                      ? `${EndPoints.ROOT_DOMAIN}
/assets/${followers}`
                      : "/default-user.png"
                  }`}
                  alt="avatar"
                />
              </div>
            </div>
            {isLiked && (
              <div className="text_cont">
                <span>
                  Liked by <span className="bold">Big Fame</span> and
                  <span className="bold">1,993 others</span>
                </span>
              </div>
            )}
          </div>
          {/* <p>{description}</p> */}
        </div>
        {isComments &&
          comments?.map(({ user, username, picsPath, comment }) => {
            <Comment
              user={user}
              username={username}
              picsPath={picsPath}
              content={comment}
              author={username}
              timestamp={new Date().toUTCString()}
            />;
          })}
      </div>
    </StyledPost>
  );
};

export default Post;
