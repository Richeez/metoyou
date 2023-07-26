/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import { AiFillLike } from "react-icons/ai";
import { BiShareAlt } from "react-icons/bi";
import { BsBookmark, BsThreeDots } from "react-icons/bs";
import { FaRegComment } from "react-icons/fa";
import Profile from "../profile/profile";
import { StyledPost } from "./styledPost";
import { /* useDispatch */ useSelector } from "react-redux";
import { selectCurrentUserId } from "../../../manager/auth/authSlice";
// import { useState } from "react";

const Post = ({
  // postId,
  postUserId,
  username,
  description,
  location,
  picsPath,
  userPicsPath,
  likes,
  // comments,
  frndPics,
}) => {
  console.log("as user", username);
  const name = username ? `${username}` : "username";
  // const dispatch = useDispatch();
  // const [isComments, setIsComments] = useState(false);
  const loggedInUserId = useSelector(selectCurrentUserId);
  const isLiked = Boolean(likes[loggedInUserId]);
  // const likeCount = Object.keys(likes).length;
  return (
    <StyledPost>
      <div className="profile">
        <Profile img={userPicsPath} id={postUserId} profile size={"60px"} />
        <div className="text tac">
          <p>{name}</p>
          <p>{location}</p>
        </div>
        <BsThreeDots className="icon" />
      </div>
      <div className="post">
        <div className="img-wrapper">
          <img
            src={`https://metoyou-api.vercel.app/assets/${picsPath}`}
            alt="post"
          />
        </div>
        <div className="icons_wrapper">
          <div className="left-icons">
            <AiFillLike className="icon" />
            <FaRegComment className="icon" />
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
                    frndPics
                      ? `https://metoyou-api.vercel.app/assets/${frndPics}`
                      : "https://metoyou-api.vercel.app/assets/default-user.png"
                  }`}
                  alt="avater"
                />
              </div>
              <div className="img-wrapper">
                <img
                  src={`${
                    frndPics
                      ? `https://metoyou-api.vercel.app/assets/${frndPics}`
                      : "https://metoyou-api.vercel.app/assets/default-user.png"
                  }`}
                  alt="avater"
                />
              </div>
              <div className="img-wrapper">
                <img
                  src={`${
                    frndPics
                      ? `https://metoyou-api.vercel.app/assets/${frndPics}`
                      : "https://metoyou-api.vercel.app/assets/default-user.png"
                  }`}
                  alt="avater"
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
          <p>{description}</p>
        </div>
      </div>
    </StyledPost>
  );
};

export default Post;
