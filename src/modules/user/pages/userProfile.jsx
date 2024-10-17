/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react-hooks/rules-of-hooks */
import { IoMdBriefcase, IoMdSettings } from "react-icons/io";
import { FaChevronLeft, FaGreaterThan } from "react-icons/fa";
import "./userProfile.css";
// import Lottie from "lottie-react";
// import Empty from "../../../Components/profile/empty-state.json";
import StartFromTop from "../../../Components/StartFromTop";
import { useState, useEffect, useRef, useCallback } from "react";
import {
  useGetUserByIdQuery,
  useGetUserQuery,
  useGetUserPostsQuery,
  useGetUserLikedPostsQuery,
} from "../../../manager/usersReq/usersApiSlice";
import { useSelector } from "react-redux";
import { MdLocationPin } from "react-icons/md";
import { getCurrentUserId } from "../../../manager/auth/authSlice";
import { useNavigate, useParams } from "react-router-dom";
import { Fetching } from "../../../svgs";
import useTitle from "../../../hooks/useTitle";
import OutsideClickHandler from "../../../hooks/useClickOutside";
import HttpErrorHandler from "../../../utils/http_error_handler";
import { capitalizeFirstLetter } from "../../../helpers/reuseable";
import { BackDrop } from "../../../Components/backdrop";
import EditProfile from "./components/edit-profile/EditProfile";
import LightBoxGallery from "../../../Components/LightBoxGallery/LightboxGallery";
import { Section } from "../../../Components/container";
import Avatar from "@/Components/profile/Avatar";
import UserPostActivities from "../userPostActivities";

const UserProfile = () => {
  const [toggle, setToggle] = useState(false);
  const editor = useRef(null);
  const cover = useRef(null);
  const picture = useRef(null);
  const { userId } = useParams();
  const [imgIndex, setImgIndex] = useState(0);
  const _id = useSelector(getCurrentUserId);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("posts");
  const [userPosts, setUserPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);

  const firstName = user?.username
    ? capitalizeFirstLetter(user.username.split(" ")[0])
    : "";
  useTitle(`${firstName}'s Profile`);
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

  let res = null;
  let isLoading = true;
  let isError = false;
  let error = null;
  let isSuccess = null;
  let allUserPosts = null;
  let allLikedPosts = null;
  let allSavedPosts = null;

  const profileUserId = userId;

  try {
    const currentUserId =
      profileUserId === _id
        ? useGetUserQuery()
        : useGetUserByIdQuery(profileUserId);
    ({ data: res, isLoading, isError, isSuccess, error } = currentUserId);

    const getAllUserPosts = useGetUserPostsQuery(userId);
    ({ data: allUserPosts } = getAllUserPosts);

    const getAllLikedPosts = useGetUserLikedPostsQuery(userId);
    ({ data: allLikedPosts } = getAllLikedPosts);
    console.log(getAllLikedPosts);
  } catch (error) {
    isError = true;
    HttpErrorHandler.spitHttpErrorMsg(error);
    console.error("Error fetching user:", error);
  }

  useEffect(() => {
    //? Render the data once it has been successfully fetched
    setUser(res?.data);
    setUserPosts(allUserPosts?.data);
    setLikedPosts(allLikedPosts?.data);
  }, [isSuccess, res, allUserPosts, allLikedPosts]);

  console.log(userPosts);

  let profile;
  if (isLoading) {
    // Render a loading state while the data is being fetched
    profile = (
      <div className="loading-div">
        <Fetching />
      </div>
    );
  } else if (isError) {
    // const statusCode = error?.status;
    // profile = statusCode === 404 ? <NotFound /> : <Navigate to="/login" />;
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
      <Section className="profile-cont">
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
              <button className="icon" onClick={() => navigate(-1)}>
                <FaChevronLeft />
              </button>
              <img
                src={
                  backgroundBg?.length > 0 ? backgroundBg[0]?.url : "/facts.jpg"
                }
                alt="background"
              />
            </div>
            <div className="profile-info flex-cont">
              <LightBoxGallery
                files={picsPath}
                imgIndex={imgIndex}
                setImgIndex={setImgIndex}
              >
                <Avatar img={picsPath} size={"110px"} />
              </LightBoxGallery>
              <div className="profile-user tac">
                <p className="profile-name cap">{username}</p>
                <p className="handle-name">@{nickname}</p>
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
                <p className="figure">{friends ? friends?.length : 0}</p>
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

          <div className="w-full flex flex-col gap-5 items-center justify-center">
            <div className="font-semibold flex md:text-xl gap-20 md:gap-28 items-center pb-2 border-b border-black">
              <p
                className={
                  activeTab === "posts"
                    ? "font-black border-b-2 border-black"
                    : ""
                }
                onClick={() => setActiveTab("posts")}
              >
                Posts
              </p>
              <p
                className={
                  activeTab === "liked"
                    ? "font-black border-b-2 border-black"
                    : ""
                }
                onClick={() => setActiveTab("liked")}
              >
                Liked posts
              </p>
              <p
                className={
                  activeTab === "marks"
                    ? "font-black border-b-2 border-black"
                    : ""
                }
                onClick={() => setActiveTab("marks")}
              >
                Bookmarks
              </p>
            </div>

            <div className="flex w-full justify-center items-center pt-3">
              <div className="flex flex-col gap-5 w-11/12 md:w-1/2">
                {activeTab === "posts" && (
                  <UserPostActivities arr={userPosts} msg={"No post found"} />
                )}
                {activeTab === "liked" && (
                  <UserPostActivities
                    arr={likedPosts}
                    msg={"No liked posts found"}
                  />
                )}
                {activeTab === "marks" && (
                  <UserPostActivities
                    arr={bookmarks}
                    msg={"No bookmarks found"}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </Section>
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

//work in progress

{
  /* <div className="photos flex-cont">
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
                  <img
                    src="/profile-3.jpg"
                    alt=""
                    className="other-photos-img"
                  />
                </div>
                <div className="other-photos-img">
                  <img
                    src="/elon-musk.jpg"
                    alt=""
                    className="other-photos-img"
                  />
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
                  <Lottie className="empty" animationData={Empty} />
                </div>
                // <PostsWidget userId={userId} isProfile /> 
              </div>
            </div>
            </div> 
          */
}
