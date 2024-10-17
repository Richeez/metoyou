/* eslint-disable react/prop-types */
import { MdClose } from "react-icons/md";
import { StyledEditor } from "./styledEditor";
import { useEffect, useRef, useState } from "react";
import { useAuthApi } from "../../../../../manager/auth/authApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import {
  getCurrentPost,
  getCurrentUser,
  getCurrentUserId,
  setCredentials,
  setPosts,
} from "../../../../../manager/auth/authSlice";
import {
  isValidEmail,
  toaster,
  uploadFile,
} from "../../../../../helpers/reuseable";
import HttpErrorHandler from "../../../../../utils/http_error_handler";
import { CustomButton } from "../../../../../Components/button";
import { StyledInput } from "../../../../../Components/inputs/styledInput";

const EditProfile = ({
  handleToggle,
  cover,
  picture,
  editField,
  setEditField,
  editor,
  closeRef,
}) => {
  const coverImg = useRef(null);
  const profileImage = useRef(null);

  let validEmail;
  let imageArray;
  const id = useSelector(getCurrentUserId);
  const user = useSelector(getCurrentUser);
  const posts = useSelector(getCurrentPost);

  const handleButtonClickForProfileImage = () => {
    profileImage.current.click();
  };
  const handleButtonClickForCover = () => {
    coverImg.current.click();
  };

  const [newData, setNewData] = useState(null);

  // const [updateProfile, { isLoading }] = useUpdateProfileMutation();
  const { updateProfile } = useAuthApi();
  const [updateMutation, { isLoading }] = updateProfile;

  const dispatch = useDispatch();

  useEffect(() => {
    if (newData) {
      dispatch(setPosts({ posts: newData.posts }));
      dispatch(setCredentials({ ...newData }));
    }
  }, [newData, dispatch, posts, user]);
  const handleFileInputChangeForCover = (e) => {
    const files = e.target.files;
    const updatedFiles = [...files]; //? Use only the most recent selection
    setEditField((prev) => ({
      ...prev,
      images: { ...prev.images, cover: updatedFiles },
    }));
    cover.current.textContent = updatedFiles[0]?.name;
  };

  const handleFileInputChangeForProfileImage = (e) => {
    const files = e.target.files;
    const updatedFiles = [...files]; //? Use only the most recent selection

    setEditField((prev) => ({
      ...prev,
      images: { ...prev?.images, profile: updatedFiles },
    }));
    picture.current.textContent = updatedFiles[0]?.name;
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

  const handleTextsField = (e) => {
    const { name, value } = e.target;

    //? Check if the field is 'nickname' before applying space prevention
    const sanitizedValue =
      name === "nickname" ? value.replace(/\s/g, "").toLowerCase() : value;

    setEditField((prev) => ({ ...prev, [name]: sanitizedValue }));
  };

  const { nickname, occupation, email, location, images } = editField ?? {};
  const handleUpdate = async (e) => {
    e.preventDefault();
    console.log("🚀 ~ editField:", editField);
    console.log("start");
    if (
      !nickname &&
      !occupation &&
      !email &&
      !location &&
      (!images?.profile.length || !images?.cover.length)
    )
      return toaster("Fields are empty", true);

    if (images?.length !== 0) {
      imageArray = await uploadFile(images);

      console.log("fileUrl", imageArray);
    }

    if (email) {
      validEmail = isValidEmail(email);
      if (!validEmail.isValid) {
        return;
      }
    }

    try {
      const profileRes = await updateMutation({
        userId: id,
        nickname,
        occupation,
        email,
        location,
        imageArray,
      }).unwrap();
      setNewData(profileRes);
      setEditField({
        nickname: "",
        occupation: "",
        email: "",
        location: "",
        images: [],
      });
      handleToggle();
    } catch (error) {
      HttpErrorHandler.spitHttpErrorMsg(error);
    }
    // dispatch(setPosts({ ...newData }));
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
          <div className="close_menu" ref={closeRef}>
            <MdClose onClick={handleToggle} className="icon" />
          </div>
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
