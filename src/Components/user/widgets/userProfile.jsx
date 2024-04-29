/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react-hooks/rules-of-hooks */
import { IoMdBriefcase, IoMdSettings } from "react-icons/io";
import { FaGreaterThan } from "react-icons/fa";
import "../../user/widgets/userProfile.css";
import Lottie from "lottie-react";
import Empty from "../profile/empty-state.json";
import StartFromTop from "../../StartFromTop";
import { useState, useEffect, useRef, useCallback } from "react";
import { useGetUserIdQuery } from "../../../manager/usersReq/usersApiSlice";
import { useSelector } from "react-redux";
import Profile from "../profile/profile";
import { BackDrop } from "../../features/backdrop";
import EditProfile from "./edit-profile/EditProfile";
import { MdLocationPin } from "react-icons/md";
import { selectCurrentUserId } from "../../../manager/auth/authSlice";
import { Navigate, useParams } from "react-router-dom";
import { NotFound } from "../../pages";
import { Fetching } from "../../../svgs";
import useTitle from "../../../hooks/useTitle";
import PostsWidget from "../post/postsWidget";
import OutsideClickHandler from "../../../hooks/useClickOutside";

const UserProfile = () => {
  useTitle("Profile");
  const [toggle, setToggle] = useState(false);
  const editor = useRef(null);
  const cover = useRef(null);
  const picture = useRef(null);
  const { userId } = useParams();
  const _id = useSelector(selectCurrentUserId);
  const [id, setUserId] = useState(null); // Assuming you have a state to store the current user ID
  const [user, setUser] = useState(null);
  const closeRef = useRef(null);
  const [editField, setEditField] = useState({
    nickname: "",
    occupation: "",
    email: "",
    location: "",
    images: {
      profile: [],
      cover: [],
    },
  });

  const handleToggle = useCallback(() => {
    setToggle((prevToggle) => !prevToggle);
    const ref = editor.current;
    ref.classList.toggle("pop-up");
    picture.current.textContent = "";
    cover.current.textContent = "";
    setEditField({
      nickname: "",
      occupation: "",
      email: "",
      location: "",
      images: {
        profile: [],
        cover: [],
      },
    });
  }, []);

  const handleEditor = useCallback(() => {
    setToggle(false);
    const ref = editor.current;
    ref.classList.remove("pop-up");
    picture.current.textContent = "";
    cover.current.textContent = "";
    setEditField({
      nickname: "",
      occupation: "",
      email: "",
      location: "",
      images: {
        profile: [],
        cover: [],
      },
    });
  }, []);

  const profileUserId = userId;
  const currentUserId =
    profileUserId === id
      ? useGetUserIdQuery(_id)
      : useGetUserIdQuery(profileUserId);
  const { data: res, error, isLoading, isSuccess, isError } = currentUserId;

  useEffect(() => {
    setUserId(res); // Set the current user ID based on your logic
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const navigate = useNavigate();
  useEffect(() => {
    //? Render the data once it has been successfully fetched
    setUser(res);
  }, [isSuccess, res]);

  let profile;
  if (isLoading) {
    // Render a loading state while the data is being fetched
    profile = (
      <div className="loading-div">
        <Fetching />
      </div>
    );
  } else if (isError) {
    const statusCode = error?.status;

    profile = statusCode === 404 ? <NotFound /> : <Navigate to="/login" />;
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
    } = user ?? {};
    profile = (
      <div className="profile flex-cont">
        <BackDrop className={`${toggle ? "pop-up" : "offSet"}`}>
          <OutsideClickHandler
            onOutsideClick={handleEditor}
            menuRefs={[closeRef]}
          >
            <EditProfile
              editor={editor}
              editField={editField}
              setEditField={setEditField}
              handleToggle={handleToggle}
              cover={cover}
              picture={picture}
              closeRef={closeRef}
            />
          </OutsideClickHandler>
        </BackDrop>

        <div className="flex-cont">
          <div className="background-image">
            <img
              src={
                backgroundBg.length !== 0 ? backgroundBg[0]?.url : "/facts.jpg"
              }
              alt="background"
            />
          </div>
          <div className="profile-info flex-cont">
            <Profile img={picsPath} size={"110px"} />
            <div className="profile-user tac">
              <p className="profile-name">{username ? username : "username"}</p>
              <p className="handle-name">{`@${nickname}`}</p>
            </div>
          </div>
        </div>

        <div className="interests">
          <p className="int">Art</p>
          <p className="int">Music</p>
          <p className="int">Travels</p>
        </div>

        {profileUserId === _id && (
          <div className="button-settings">
            <div className="edit-button">
              <button onClick={handleToggle}>Edit Profile</button>
            </div>
            <div className="settings">
              <IoMdSettings />
            </div>
          </div>
        )}

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
            <p className="rating-info">
              {" "}
              Who's viewed your profile:{" "}
              <span className="figure">
                {viewedProfile ? viewedProfile : 0}
              </span>
            </p>
          </div>
          <div className="rating-cont ">
            <p className="rating-info">
              impressions of your post:{" "}
              <span className="figure">{impressions ? impressions : 0}</span>
            </p>
          </div>
        </div>

        <div className="photos flex-cont">
          <div className="photos-head">
            <p className="photos-label">Photos</p>
            <FaGreaterThan className="goTo" />
          </div>

          <div className="photos-cont">
            <div className="main-photo">
              <img src="/profile-2.jpg" alt="" />
            </div>

            <div className="other-photos">
              <div className="other-photos-img">
                <img src="/profile-3.jpg" alt="" className="other-photos-img" />
              </div>
              <div className="other-photos-img">
                <img src="/elon-musk.jpg" alt="" className="other-photos-img" />
              </div>
              <div className="other-photos-img">
                <img
                  src="/profile-pic.png"
                  alt=""
                  className="other-photos-img"
                />
              </div>

              <div className="last-photo">
                <img src="/smart.jpeg" alt="" className="other-photos-img" />
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
                <p className="no-post">No video(s) yet!</p>
                <span className="click-add">click here to add</span>
              </div>

              <Lottie className="empty" animationData={Empty} />
              <PostsWidget userId={userId} isProfile />
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
