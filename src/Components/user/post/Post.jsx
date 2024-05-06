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
  timestamp,
}) => {
  const name = username;
  const dispatch = useDispatch();
  const [isComments, setIsComments] = useState(false);
  // const [likedUsers, setLikedUsers] = useState(null);
  // const [commentedUsers, setCommentedUsers] = useState(null);
  const loggedInUserId = useSelector(getCurrentUserId);
  // const isLiked = Boolean(likes[loggedInUserId].userId);
  const isLiked = likes?.some((like) => like.userId === loggedInUserId);
  const loggedInUser =
    likes?.find(({ userId }) => userId === loggedInUserId) ?? {};
  const notFirst = loggedInUserId !== likes[0]?.userId;
  // const likeCount = Object.keys(likes).length;
  const likeCount = likes?.length;
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
          <p>Published: {formattedDate?.ago || formattedDate?.date}</p>
        </div>
        <BsThreeDots className="icon" />
      </div>
      <div className="post">
        {picsPath.length !== 0 && (
          <div className="img-wrapper">
            <img src={picsPath[0]?.url} alt="post's image" />
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
            {likes?.length > 0 && (
              <div className="img_cont">
                {likes?.slice(0, 3).map(({ picsPath }, index) => {
                  console.log("picsPath", picsPath); // You can keep the console log here for debugging

                  return (
                    <div className="img-wrapper" key={index}>
                      <img
                        src={picsPath[0]?.url || "/default-user.png"}
                        alt="avatar"
                      />
                    </div>
                  );
                })}
              </div>
            )}

            {isLiked && (
              <div className="text_cont">
                <span>
                  Liked by{" "}
                  <span className="bold">{`${
                    notFirst ? likes[0]?.username : "You"
                  } ${
                    loggedInUser && notFirst
                      ? `${likes?.length === 2 ? "and" : ","} You`
                      : ""
                  }`}</span>
                  <span className="bold">
                    {likes?.length > 2 ? `and ${likes.length - 2} others` : ""}
                  </span>{" "}
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
