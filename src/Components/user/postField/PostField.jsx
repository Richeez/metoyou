import { useState, useRef } from "react";
import { MdAttachment, MdOutlineInsertPhoto } from "react-icons/md";
import { VscReactions } from "react-icons/vsc";
import Profile from "../profile/profile";
import { StyledPostField } from "./styledPostField";
import { useDispatch, useSelector } from "react-redux";
import { usePostMutation } from "../../../manager/auth/authApiSlice";
import { getCurrentUser, setPosts } from "../../../manager/auth/authSlice";
import { CustomButton } from "../../features/button";
import { StyledInput } from "../../features/inputs/styledInput";
import Button from "../../features/animated buttons/Button";
import { ImageBox } from "../../features";
import { FaTimes } from "react-icons/fa";
import { toaster, uploadFile } from "../../../constants/reusables";

const PostField = () => {
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();
  // const [textareaHeight, setTextareaHeight] = useState("auto"); // Initial height

  let attachments;

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const [formData, setFormData] = useState({
    description: "",
    file: null,
  });
  const { description, file } = formData;

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

  const handleFileInputChange = (e) => {
    const selectedFile = e?.target?.files[0];
    setFormData((prev) => ({ ...prev, file: selectedFile }));
  };

  const { _id: userId, picsPath } = useSelector(getCurrentUser) ?? {};

  const [post, { isLoading }] = usePostMutation();

  const handlePost = async (e) => {
    e.preventDefault();

    if (file) {
      attachments = await uploadFile(file);

      console.log("fileUrl", attachments);
    }

    if (!file && !description) {
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
        file: null,
      });
      toaster("Post Published Successfully!");
    } catch (err) {
      return toaster(err, true);
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
            <MdAttachment className="icon" />
            <span className="desc">attachment</span>
          </div>
          <div className="icon_wrapper">
            <StyledInput
              type="file"
              id="file"
              name="file"
              title="Choose a file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleFileInputChange}
            />
            <CustomButton type="button" onClick={handleButtonClick}>
              <MdOutlineInsertPhoto className="icon" />
              <span className="desc">photo</span>
            </CustomButton>
          </div>
          <div className="icon_wrapper">
            <VscReactions className="icon" />

            <span className="desc">feeling</span>
          </div>
        </div>
        <Button onClick={handlePost} disabled={isLoading} filled>
          {isLoading ? "uploading..." : "share"}
        </Button>
      </div>
      {file && (
        <div className="previewImg">
          <FaTimes
            className="icon"
            onClick={() => setFormData((prev) => ({ ...prev, file: null }))}
          />
          <ImageBox src={URL.createObjectURL(file)} />
        </div>
      )}
    </StyledPostField>
  );
};

export default PostField;
