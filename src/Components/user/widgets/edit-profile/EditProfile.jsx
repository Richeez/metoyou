/* eslint-disable react/prop-types */
import { MdClose } from "react-icons/md";
import { StyledEditor } from "./styledEditor";
import { useRef } from "react";
import { StyledInput } from "../../../features/inputs/styledInput";
import { CustomButton } from "../../../features/button";
// import { useState } from "react";
import { useUpdateProfileMutation } from "../../../../manager/auth/authApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import {
  selectCurrentUserId,
  setPosts,
} from "../../../../manager/auth/authSlice";
import {
  isValidEmail,
  toaster,
  uploadFile,
} from "../../../../constants/reusables";
import { toast } from "react-toastify";
// import { useEffect } from "react";

const EditProfile = ({
  handleToggle,
  cover,
  picture,
  editField,
  setEditField,
  editor,
}) => {
  const coverImg = useRef(null);
  const profileImage = useRef(null);

  let validEmail;
  let imageArray;
  const id = useSelector(selectCurrentUserId);

  const handleButtonClickForProfileImage = () => {
    profileImage.current.click();
  };
  const handleButtonClickForCover = () => {
    coverImg.current.click();
  };

  const handleFileInputChangeForCover = (e) => {
    const files = e.target.files;
    const updatedFiles = [...files]; //? Use only the most recent selection
    setEditField((prev) => ({
      ...prev,
      images: { ...prev.images, cover: [...files] },
    }));
    cover.current.textContent = updatedFiles[0].name;
  };

  const handleFileInputChangeForProfileImage = (e) => {
    const files = e.target.files;
    const updatedFiles = [...files]; //? Use only the most recent selection
    setEditField((prev) => ({
      ...prev,
      images: { ...prev.images, profile: [...files] },
    }));

    picture.current.textContent = updatedFiles[0].name;
  };

  // const handleFileInputChangeForImage = (e) => {
  //   const file = e?.target?.files[0];

  //   setEditField((prev) => {
  //     const newImages = [...(prev.images || []), file];

  //     // Do something with the selected file names
  //     const fileNames = getFilesNames(newImages, prev);

  //     // Assign the file names to refs
  //     picture.current.textContent = fileNames.picture;
  //     cover.current.textContent = fileNames.cover;

  //     return {
  //       ...prev,
  //       images: newImages,
  //     };
  //   });
  // };

  console.log(
    "🚀 ~ file: EditProfile.jsx:57 ~ EditProfile ~ editField:",
    editField?.images
  );
  const handleTextsField = (e) => {
    const { name, value } = e.target;

    // Check if the field is 'nickname' before applying space prevention
    const sanitizedValue =
      name === "nickname" ? value.replace(/\s/g, "").toLowerCase() : value;

    setEditField((prev) => ({ ...prev, [name]: sanitizedValue }));
  };

  const [updateProfile, { isLoading }] = useUpdateProfileMutation();
  const dispatch = useDispatch();

  const { nickname, occupation, email, location, images } = editField ?? {};
  const handleUpdate = async (e) => {
    e.preventDefault();
    console.log("start");
    if (!nickname && !occupation && !email && !location && !images)
      return toaster("Fields are empty", toast.error);

    if (images) {
      imageArray = await uploadFile(images);

      console.log("fileUrl", imageArray);
    }

    if (email) {
      validEmail = isValidEmail(email);
      if (!validEmail.isValid) {
        return;
      }
    }

    // useEffect(() => {
    //   if (post) {
    //     dispatch(setPosts({ posts: post }));
    //   }
    // }, [post, dispatch]);

    const newData = await updateProfile({
      userId: id,
      nickname,
      occupation,
      email,
      location,
      imageArray,
    }).unwrap();
    dispatch(setPosts({ ...newData }));
    setEditField({
      nickname: "",
      occupation: "",
      email: "",
      location: "",
      images: [],
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
            placeholder="nickname"
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
            name="picture"
            title="Choose a file"
            accept="image/*"
            ref={profileImage}
            onChange={handleFileInputChangeForProfileImage}
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
            name="cover"
            title="Choose a file"
            accept="image/*"
            ref={coverImg}
            onChange={handleFileInputChangeForCover}
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
