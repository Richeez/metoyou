/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react-hooks/rules-of-hooks */
import { IoMdBriefcase, IoMdSettings } from "react-icons/io";
import { FaGreaterThan } from "react-icons/fa";
import "../../user/widgets/userProfile.css";
import Lottie from "lottie-react";
import Empty from "../profile/empty-state.json";
import StartFromTop from "../../StartFromTop";
import { useState, useEffect, useRef } from "react";
import { useGetUserIdQuery } from "../../../manager/usersReq/usersApiSlice";
import { useSelector } from "react-redux";
import Profile from "../profile/profile";
import { BackDrop } from "../../features/backdrop";
import EditProfile from "./edit-profile/EditProfile";
import { MdLocationPin } from "react-icons/md";
import { selectCurrentUserId } from "../../../manager/auth/authSlice";
import { useParams } from "react-router-dom";
import { ExpSession } from "../../pages";
import { Fetching } from "../../../svgs";

const UserProfile = () => {
  const [toggle, setToggle] = useState(false);
  const editor = useRef(null);
  const params = useParams();

  const handleToggle = () => {
    setToggle((prev) => !prev);
    const ref = editor.current;
    ref.classList.toggle("pop-up");
  };
  const _id = useSelector(selectCurrentUserId);
  const [id, setUserId] = useState(null); // Assuming you have a state to store the current user ID
  const [user, setUser] = useState(null);
  const profileUserId = params?.id;
  const currentUserId =
    profileUserId === id
      ? useGetUserIdQuery(_id)
      : useGetUserIdQuery(profileUserId);
  const { data: userId, isLoading, isSuccess, isError } = currentUserId;

  useEffect(() => {
    setUserId(userId); // Set the current user ID based on your logic
  }, []);

  // const navigate = useNavigate();
  useEffect(() => {
    //? Render the data once it has been successfully fetched
    setUser(userId);
  }, [isSuccess, userId]);

  let profile;
  if (isLoading) {
    // Render a loading state while the data is being fetched
    profile = (
      <div className="loading-div">
        <Fetching />
        {/* <AiOutlineLoading3Quarters className="loading-effect" /> */}
      </div>
    );
  } else if (isError) {
    profile = <ExpSession />;
  } else if (isSuccess && user) {
    const {
      username,
      nickname,
      impressions,
      occupation,
      friends,
      picsPath,
      backgroundBg,
      viewedProfile,
      location,
    } = user;

    let name = !nickname ? username : nickname;

    profile = (
      <div className="profile flex-cont">
        <BackDrop className={`${toggle ? "pop-up" : "offSet"}`}>
          <EditProfile editor={editor} handleToggle={handleToggle} />
        </BackDrop>
        <div className="flex-cont">
          <div className="background-image">
            <img
              src={
                backgroundBg
                  ? `https://metoyou-api.vercel.app/api/assets/${backgroundBg} `
                  : "https://metoyou-api.vercel.app/api/assets/facts.jpg"
              }
              alt="background"
            />
          </div>
          <div className="profile-info flex-cont">
            <Profile img={picsPath} size={"110px"} />
            <div className="profile-user">
              <p className="profile-name">{username ? username : "username"}</p>
              <p
                style={{ textTransform: "lowercase" }}
                className="handle-name"
              >{`@${name}`}</p>
            </div>
          </div>
        </div>

        <div className="interests">
          <p className="int">Art</p>
          <p className="int">Music</p>
          <p className="int">Travels</p>
        </div>

        <div className="button-settings">
          <div className="edit-button">
            <button onClick={handleToggle}>Edit Profile</button>
          </div>
          <div className="settings">
            <IoMdSettings />
          </div>
        </div>

        <div className="rating">
          <div className="row">
            <div className="rating-cont ">
              <p className="rating-info">posts</p>
              <p className="figure">200k</p>
            </div>

            <div className="rating-cont ">
              <p className="rating-info">followers</p>
              <p className="figure">{friends ? friends.length : 0}</p>
            </div>

            <div className="rating-cont">
              <p className="rating-info">following</p>
              <p className="figure">500k</p>
            </div>
          </div>
          {occupation && (
            <div className="rating-cont">
              <p className="rating-info">
                <IoMdBriefcase />
              </p>
              <p className="figure">{occupation}</p>
            </div>
          )}
          {location && (
            <div className="rating-cont ">
              <p className="rating-info">
                <MdLocationPin />
              </p>
              <p className="figure">{location}</p>
            </div>
          )}

          <div className="rating-cont">
            <p className="rating-info"> Who's viewed your profile:</p>
            <p className="figure">{viewedProfile ? viewedProfile : 0}</p>
          </div>
          <div className="rating-cont ">
            <p className="rating-info">impressions of your post:</p>
            <p className="figure">{impressions ? impressions : 0}</p>
          </div>
        </div>

        <div className="photos flex-cont">
          <div className="photos-head">
            <p className="photos-label">Photos</p>
            <FaGreaterThan className="goTo" />
          </div>

          <div className="photos-cont">
            <div className="main-photo">
              <img
                src="https://metoyou-api.vercel.app/api/assets/profile-2.jpg"
                alt=""
              />
            </div>

            <div className="other-photos">
              <div className="other-photos-img">
                <img
                  src="https://metoyou-api.vercel.app/api/assets/profile-3.jpg"
                  alt=""
                  className="other-photos-img"
                />
              </div>
              <div className="other-photos-img">
                <img
                  src="https://metoyou-api.vercel.app/api/assets/elon-musk.jpg"
                  alt=""
                  className="other-photos-img"
                />
              </div>
              <div className="other-photos-img">
                <img
                  src="https://metoyou-api.vercel.app/api/assets/profile-pic.png"
                  alt=""
                  className="other-photos-img"
                />
              </div>

              <div className="last-photo">
                <img
                  src="https://metoyou-api.vercel.app/api/assets/Facebook.png"
                  alt=""
                  className="other-photos-img"
                />
                <span className="overlay">+4</span>
              </div>
            </div>
          </div>
        </div>

        <div className="videos flex-cont">
          <div className="videos-head">
            <h2 className="videos-label">Videos</h2>
            <FaGreaterThan className="goTo" />
          </div>

          <div className="videos-cont">
            <div className="empty-cont flex-cont">
              <div className="empty-word flex-cont">
                <p className="no-post">No post(s) yet!</p>
                <span className="click-add">click here to add</span>
              </div>
              <Lottie className="empty" animationData={Empty} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <StartFromTop />
      {profile}
    </>
  );
};

export default UserProfile;
