import { useState, useRef } from "react";
import { MdAttachment, MdOutlineInsertPhoto } from "react-icons/md";
import { VscReactions } from "react-icons/vsc";
import Profile from "../profile/profile";
import { StyledPostField } from "./styledPostField";
import { useDispatch, useSelector } from "react-redux";
import { usePostMutation } from "../../../manager/auth/authApiSlice";
import { selectCurrentUser, setPosts } from "../../../manager/auth/authSlice";
import { CustomButton } from "../../features/button";
import { StyledInput } from "../../features/inputs/styledInput";
import Button from "../../features/animated buttons/Button";
import { ImageBox } from "../../features";
import { FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";
import { toaster, uploadFile } from "../../../constants/reusables";

const PostField = () => {
  const fileInputRef = useRef(null);
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
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileInputChange = (e) => {
    const selectedFile = e?.target?.files[0];
    setFormData((prev) => ({ ...prev, file: selectedFile }));
  };

  const { _id: userId, picsPath } = useSelector(selectCurrentUser) ?? {};

  const [post, { isLoading }] = usePostMutation();

  const dispatch = useDispatch();

  const handlePost = async (e) => {
    e.preventDefault();

    if (file) {
      attachments = await uploadFile(file);

      console.log("fileUrl", attachments);
    }

    if (!file && !description) {
      //? No file and description available
      return toaster("You do not have any post to publish.", toast.error);
    }

    try {
      const postData = await post({
        userId,
        description,
        attachments,
      }).unwrap();
      // const postData = await post(newPost).unwrap();
      // const postData = await upload(files).unwrap();

      dispatch(setPosts({ posts: postData }));

      setFormData({
        description: "",
        file: null,
      });
      toaster("Post Published Successfully!", toast.success);
    } catch (err) {
      return toaster(err, toast.error);
    }
  };

  return (
    <StyledPostField encType="multipart/form-data" onSubmit={handlePost}>
      <div className="combine">
        <Profile profile id={userId} img={picsPath} size={"50px"} />
        <div className="input_cont">
          <input
            type="text"
            name="description"
            autoComplete="off"
            value={description}
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
