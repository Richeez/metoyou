/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import { AiFillLike } from "react-icons/ai";
import { BiEdit, BiShareAlt } from "react-icons/bi";
import { BsBookmark, BsThreeDots } from "react-icons/bs";
import { FaRegComment } from "react-icons/fa";
import Profile from "../profile/profile";
import { StyledPost } from "./styledPost";

import { useDispatch, useSelector } from "react-redux";
import {
  getCurrentUserId,
  setPost,
  setPosts,
} from "../../../manager/auth/authSlice";

import {
  useDeletePostMutation,
  useLikeMutation,
} from "../../../manager/auth/authApiSlice";
import Comment from "../widgets/comments/Comment";
import { useRef, useState } from "react";
import {
  renderFileType,
  toaster,
  useDynamicDate,
} from "../../../constants/reusables";
import OutsideClickHandler from "../../../hooks/useClickOutside";
import { MdDeleteForever } from "react-icons/md";
import LightBoxGallery from "../../features/LightBoxGallery/LightboxGallery";
import HttpErrorHandler from "../../../utils/http_error_handler";

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
  const [isPostOptions, setIsPostOptions] = useState(false);
  const [imgIndex, setImgIndex] = useState(0);
  const optionsMenuRef = useRef(null);
  // const [likedUsers, setLikedUsers] = useState(null);
  // const [commentedUsers, setCommentedUsers] = useState(null);
  const loggedInUserId = useSelector(getCurrentUserId);
  // const isLiked = Boolean(likes[loggedInUserId].userId);
  const isLikedByLoggedInUser = likes?.some(
    (like) => like.userId === loggedInUserId
  );

  const isFirstInLikes = loggedInUserId === likes[0]?.userId;
  // const likeCount = Object.keys(likes).length;
  const likeCount = likes?.length;
  const [like] = useLikeMutation();
  const [deletePost] = useDeletePostMutation();
  const formattedDate = useDynamicDate(timestamp);
  const handlePostOptions = () => {
    setIsPostOptions((prev) => !prev);
  };

  const handleLike = async () => {
    const credentials = {
      postId,
    };

    try {
      // Assuming you have the necessary data for the like in a "credentials" object
      const updatedPost = await like(credentials).unwrap();
      dispatch(setPost({ post: updatedPost }));
    } catch (error) {
      //? Handle error here
      HttpErrorHandler.spitHttpErrorMsg(error);
    }
  };

  const handleComment = async () => {
    setIsComments((prev) => !prev);
  };
  const handlePostDeletion = async () => {
    const credentials = {
      postId,
    };
    try {
      const updatedPost = await deletePost(credentials).unwrap();
      dispatch(setPosts({ posts: updatedPost }));
      toaster("Post Deleted Successfully!");
      setIsPostOptions(false);
    } catch (error) {
      toaster(
        "An unexpected error occurred while trying to delete post!",
        true
      );
    }
  };

  return (
    <StyledPost>
      <div className="profile">
        <Profile img={userPicsPath} id={postUserId} profile size={"60px"} />
        <div className="text">
          <p>{name}</p>
          <p>Published: {formattedDate?.ago || formattedDate?.date}</p>
        </div>
        {postUserId === loggedInUserId && (
        <span ref={optionsMenuRef} className="close_menu">
          <BsThreeDots onClick={handlePostOptions} className="icon" />
        </span>
        )}
        {isPostOptions && (
          <OutsideClickHandler
            onOutsideClick={setIsPostOptions}
            menuRefs={[optionsMenuRef]}
          >
            <ul className="post_options">
              <li onClick={handlePostDeletion}>
                <MdDeleteForever /> delete
              </li>
              <li>
                <BiEdit /> edit
              </li>
            </ul>
          </OutsideClickHandler>
        )}
      </div>
      <div className="post">
        {picsPath.length !== 0 && (
          <div
            className="previewFiles"
            style={{
              display: "grid",
              gridAutoFlow: "dense",
              position: "relative",
              gap: ".2rem",
              maxWidth: "100%",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(min(100%, 150px), 1fr))",
              padding: 0,
            }}
          >
            {picsPath?.length > 4 && (
              <div
                key="remaining"
                className="previewFile"
                style={{
                  display: "grid",
                  placeItems: "center",
                  position: "absolute",
                  right: "5%",
                  bottom: "5%",
                  zIndex: "4",
                  overflow: " hidden",
                  padding: ".2rem",
                  borderRadius: "3px",
                  background: "rgba(0, 0, 0, 0.2)",
                }}
              >
                <div
                  style={{
                    fontSize: "20px",
                    color: "#ffffff",
                    fontWeight: "bold",
                  }}
                >
                  +{picsPath?.length - 4}
                </div>
              </div>
            )}

            {picsPath?.slice(0, 4).map((attachment, index) => (
              <div
                key={index}
                className="previewFile"
                style={{
                  display: "grid",
                  placeItems: "center",
                  position: "relative",
                  overflow: " hidden",
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                  boxShadow: "0 0 4px rgba(0, 0, 0, 0.2)",
                }}
                onClick={() => setImgIndex(index)} // Pass the index of the child clicked
              >
                <LightBoxGallery
                  files={picsPath}
                  imgIndex={Number(imgIndex)} // Ensure imgIndex is a number
                  setImgIndex={setImgIndex}
                >
                  {renderFileType(attachment, index, setImgIndex)}
                </LightBoxGallery>
              </div>
            ))}
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
                    isLikedByLoggedInUser
                      ? "var(--blueViolet)"
                      : "var(--color-gray)"
                  } `,
                }}
                className="icon"
              />
              <p>{likeCount !== 0 ? likeCount : null}</p>
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
                  return (
                    <div key={index}>
                      <Profile img={picsPath} size="40px" radius="50%" />
                    </div>
                  );
                })}
              </div>
            )}
            {(isLikedByLoggedInUser || likes?.length !== 0) && (
              <div className="text_cont">
                <span>
                  Liked by &nbsp;
                  <span className="bold">
                    {isFirstInLikes ? "You" : likes[0]?.username}
                    {isLikedByLoggedInUser &&
                      !isFirstInLikes &&
                      likes.length > 1 &&
                      ((likes.length === 2 && " and You") ||
                        (likes.length > 2 && ", You"))}
                    &nbsp;
                  </span>
                  <span className="bold">
                    {likes &&
                      likes.length > 1 &&
                      likes.length - (isLikedByLoggedInUser ? 2 : 1) > 0 &&
                      `and ${
                        likes.length -
                        (isLikedByLoggedInUser && !isFirstInLikes ? 2 : 1)
                      } other${
                        likes.length -
                          (isLikedByLoggedInUser && !isFirstInLikes ? 2 : 1) >
                        1
                          ? "s"
                          : ""
                      }`}
                  </span>
                </span>
              </div>
            )}
          </div>
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
