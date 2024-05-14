import { useState, useRef } from "react";
import { MdAttachment, MdOutlineInsertPhoto } from "react-icons/md";
// import { VscReactions } from "react-icons/vsc";
import Profile from "../profile/profile";
import { StyledPostField } from "./styledPostField";
import { useDispatch, useSelector } from "react-redux";
import { usePostMutation } from "../../../manager/auth/authApiSlice";
import { getCurrentUser, setPosts } from "../../../manager/auth/authSlice";
import { CustomButton } from "../../features/button";
import { StyledInput } from "../../features/inputs/styledInput";
import Button from "../../features/animated buttons/Button";
// import { ImageBox } from "../../features";
import { FaTimes } from "react-icons/fa";
import { toaster, uploadFile } from "../../../constants/reusables";
import HttpErrorHandler from "../../../utils/http_error_handler";
// import LightboxGallery from "../../features/LightBoxGallery/LightBoxGallery";

const PostField = () => {
  const imageInputRef = useRef(null);
  const docInputRef = useRef(null);
  const dispatch = useDispatch();
  // const [textareaHeight, setTextareaHeight] = useState("auto"); // Initial height

  let attachments;

  const handleImageButtonClick = () => {
    imageInputRef.current.click();
  };
  const handleDocButtonClick = () => {
    docInputRef.current.click();
  };

  const [formData, setFormData] = useState({
    description: "",
    files: [],
  });
  const { description, files } = formData ?? {};

  const createPost = (e) => {
    const { name, value } = e.target;
    // Calculate the new height based on the content
    // const lineHeight = 20; // Adjust this value based on your font size
    // const minRows = 1; // Minimum number of rows
    // const maxRows = 10; // Maximum number of rows
    // const newRows = Math.min(
    //   maxRows,
    //   Math.max(minRows, Math.ceil(e.target.scrollHeight / lineHeight))
    // );
    // const newHeight = newRows * lineHeight + "px";
    // setTextareaHeight(newHeight);
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  //const handleFileInputChange = (e) => {
  // const selectedFiles = Array.from(e?.target?.files);
  //  setFormData((prev) => ({ ...prev, files: selectedFiles }));
  //};

  const handleFileInputChange = (e) => {
    const selectedFiles = Array.from(e?.target?.files);
    setFormData((prev) => ({
      ...prev,
      files: [...prev.files, ...selectedFiles],
    }));
  };

  const removeFile = (index) => {
    const updatedFiles = [...formData.files];
    updatedFiles.splice(index, 1); // Remove the file at the specified index
    setFormData({
      ...formData,
      files: updatedFiles,
    });
  };
  const displayFile = (file, index) => {
    return file?.type?.startsWith("image/") ? (
      <img
        src={URL.createObjectURL(file)}
        alt={`uploaded file no. ${index}`}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          aspectRatio: "1/1",
        }}
      />
    ) : file?.type?.startsWith("video/") ? (
      <video
        controls
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        <source src={URL.createObjectURL(file)} type={file?.type} />
      </video>
    ) : file?.type?.startsWith("application/pdf") ? ( // Check if it's a PDF file
      <iframe
        src={URL.createObjectURL(file)}
        width="100%"
        height="600px"
        title={`uploaded file no. ${index}`}
      />
    ) : (
      <p
        style={{
          color: "red",
        }}
      >
        Unsupported file type
      </p>
    );
  };
  const { _id: userId, picsPath } = useSelector(getCurrentUser) ?? {};

  const [post, { isLoading }] = usePostMutation();

  const handlePost = async (e) => {
    e.preventDefault();

    if (files?.length > 0) {
      try {
        attachments = await uploadFile(files);
        console.log("fileUrl", attachments);
      } catch (error) {
        console.log("error", error);
        HttpErrorHandler.spitHttpErrorMsg(error);
      }
    }

    if (!files.length && !description) {
      //? No file and description available
      return toaster("You do not have any post to publish.", true);
    }

    try {
      const postData = await post({
        userId,
        description,
        attachments,
      }).unwrap();

      dispatch(setPosts({ posts: postData }));

      setFormData({
        description: "",
        files: [],
      });
      toaster("Post Published Successfully!");
    } catch (err) {
      HttpErrorHandler.spitHttpErrorMsg(err);
    }
  };

  return (
    <StyledPostField encType="multipart/form-data" onSubmit={handlePost}>
      <div className="combine">
        <Profile profile id={userId} img={picsPath} size={"50px"} />
        <div className="input_cont">
          {/* <TextArea /> */}
          <input
            type="text"
            name="description"
            autoComplete="off"
            value={description}
            // style={{ height: textareaHeight }}
            onChange={createPost}
            onKeyDown={(e) => e.key === "Enter" && e.preventDefault()} // Prevent form submission on Enter key press
            placeholder="Let out your mind"
          />
        </div>
      </div>
      <div className="actions_cont">
        <div className="icons_cont">
          <div className="icon_wrapper">
            <StyledInput
              type="file"
              id="file"
              name="files"
              title="Choose a file"
              multiple
              accept=".pdf, .doc, .docx, .txt, .ppt, .pptx, .xls, .xlsx"
              ref={docInputRef}
              onChange={handleFileInputChange}
            />
            <CustomButton type="button" onClick={handleDocButtonClick}>
              <MdAttachment className="icon" />
              <span className="desc">attachment</span>
            </CustomButton>
          </div>
          <div className="icon_wrapper">
            <StyledInput
              type="file"
              id="file"
              name="files"
              title="Choose a file"
              multiple
              accept="image/*"
              ref={imageInputRef}
              onChange={handleFileInputChange}
            />
            <CustomButton type="button" onClick={handleImageButtonClick}>
              <MdOutlineInsertPhoto className="icon" />
              <span className="desc">photo</span>
            </CustomButton>
          </div>
          {/* <div className="icon_wrapper">
            <VscReactions className="icon" />

            <span className="desc">feeling</span>
          </div> */}
        </div>
        <Button onClick={handlePost} disabled={isLoading} filled>
          {isLoading ? "uploading..." : "share"}
        </Button>
      </div>
      {files?.length > 0 && (
        <div
          className="previewFiles"
          style={{
            display: "grid",
            gridAutoFlow: "dense",
            gap: "0.2rem",
            maxWidth: "100%",
            maxHeight: "200px",
            overflowX: "hidden",
            overflowY: "auto",
            backdropFilter: "blur(20px)",
            gridTemplateColumns:
              " repeat(auto-fit, minmax(min(100%, 100px), 1fr))",
            padding: 0,
            // zIndex: 4,
          }}
        >
          {files?.map((file, index) => (
            <div
              key={index}
              className="previewFile"
              style={{
                display: "grid",
                placeItems: "center",
                gap: "0",
                whiteSpace: "nowrap",
                position: "relative",
                overflow: " hidden",
                padding: "8px",
                // width: "100px",
                // height: "100px",
                border: "1px solid #ccc",
                borderRadius: "8px",
                boxShadow: "0 0 4px rgba(0, 0, 0, 0.2)",
              }}
            >
              <FaTimes className="icon" onClick={() => removeFile(index)} />
              {displayFile(file, index)}
            </div>
          ))}
          <div
            style={{
              position: "sticky",
              gridColumn: "1 / -1",
              display: "grid",
              placeItems: "center",
              bottom: "0",
              top: "50px",
              marginBottom: "20px",
              width: "100%",
            }}
          >
            {/* <button
              type="submit"
              style={{
                backgroundColor: "#2c7be5",
                borderRadius: "20px",
                padding: "10px",
                border: "0",
                color: "white",
                width: "200px",
              }}
              >
              Send
            </button> */}
          </div>
        </div>
      )}
      {/* <LightboxGallery files={files} /> */}
    </StyledPostField>
  );
};

export default PostField;
