/* eslint-disable react/prop-types */
import { MdClose } from "react-icons/md";
import { StyledEditor } from "./styledEditor";
import { useRef } from "react";
import { StyledInput } from "../../../features/inputs/styledInput";
import { CustomButton } from "../../../features/button";
import { useState } from "react";
import { useUpdateProfileMutation } from "../../../../manager/auth/authApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import {
  selectCurrentUserId,
  setPosts,
} from "../../../../manager/auth/authSlice";
// import { useEffect } from "react";

const EditProfile = ({ handleToggle, editor }) => {
  const coverImg = useRef(null);
  const profileImage = useRef(null);
  const cover = useRef(null);
  const picture = useRef(null);

  const id = useSelector(selectCurrentUserId);

  const handleButtonClickForProfileImage = () => {
    profileImage.current.click();
  };
  const handleButtonClickForCover = () => {
    coverImg.current.click();
  };

  const handleFileInputChangeForImage = (e) => {
    // const selectedFile = e?.target?.files[0];
    const file = e?.target?.files[0];
    setEditField((prev) => ({ ...prev, profilePicture: file }));
    // Do something with the selected file
    picture.current.textContent = file.name;
  };

  const handleFileInputChangeForCoverImage = (e) => {
    const file = e?.target?.files[0];
    setEditField((prev) => ({ ...prev, coverImage: file }));
    // Do something with the selected file
    cover.current.textContent = file.name;
  };

  const [editField, setEditField] = useState({
    nickname: "",
    occupation: "",
    email: "",
    location: "",
    profilePicture: null,
    coverImage: null,
  });
  const handleTextsField = (e) => {
    const { name, value } = e.target;
    setEditField((prev) => ({ ...prev, [name]: value }));
  };

  const [updateProfile, { isLoading }] = useUpdateProfileMutation();
  const dispatch = useDispatch();

  const { nickname, occupation, email, location, profilePicture, coverImage } =
    editField;
  const handleUpdate = async (e) => {
    e.preventDefault();

    const newProfile = {
      userId: id,
      nickname,
      occupation,
      email,
      location,
      profilePicture,
      coverImage,
    };

    // useEffect(() => {
    //   if (post) {
    //     dispatch(setPosts({ posts: post }));
    //   }
    // }, [post, dispatch]);

    const newData = await updateProfile(newProfile).unwrap();
    dispatch(setPosts({ ...newData }));
    setEditField({
      nickname: "",
      occupation: "",
      email: "",
      location: "",
      profilePicture: null,
      coverImage: null,
    });
    handleToggle();
  };

  return (
    <>
      {isLoading ? (
        <div className="loading-div">
          <AiOutlineLoading3Quarters className="loading-effect" />
        </div>
      ) : (
        ""
      )}
      <StyledEditor
        encType="multipart/form-data"
        onSubmit={handleUpdate}
        ref={editor}
      >
        <div className="header">
          <h1>Edit Profile</h1>
          <MdClose onClick={handleToggle} className="icon" />
        </div>
        <div className="inputs-field">
          <input
            placeholder="username"
            onChange={handleTextsField}
            value={nickname}
            name="nickname"
            id="username"
            type="text"
            autoComplete="off"
          />
          <input
            placeholder="email"
            onChange={handleTextsField}
            value={email}
            id="email"
            name="email"
            type="text"
            autoComplete="off"
          />
          <input
            placeholder="location"
            onChange={handleTextsField}
            value={location}
            id="location"
            type="text"
            name="location"
            autoComplete="off"
          />
          <input
            placeholder="occupation"
            onChange={handleTextsField}
            value={occupation}
            id="occupation"
            name="occupation"
            type="text"
            autoComplete="off"
          />
        </div>
        <div className="upload-wrapper">
          <p ref={picture} />
          <StyledInput
            type="file"
            id="file"
            name="profilePicture"
            title="Choose a file"
            accept="image/*"
            ref={profileImage}
            onChange={handleFileInputChangeForImage}
          />
          <br />
          <CustomButton
            type="button"
            onClick={handleButtonClickForProfileImage}
          >
            Change Picture
          </CustomButton>
        </div>
        <br />
        <div className="upload-wrapper">
          <p ref={cover} />
          <StyledInput
            type="file"
            id="file"
            name="coverImage"
            title="Choose a file"
            accept="image/*"
            ref={coverImg}
            onChange={handleFileInputChangeForCoverImage}
          />
          <br />
          <CustomButton type="button" onClick={handleButtonClickForCover}>
            Change Cover
          </CustomButton>
        </div>
        <button onClick={handleUpdate} className="btn">
          Update Info
        </button>
      </StyledEditor>
    </>
  );
};

export default EditProfile;
