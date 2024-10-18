import { useCommentMutation } from "@/manager/auth/authApiSlice";
import HttpErrorHandler from "@/utils/http_error_handler";
import { useState } from "react";
import { SiMinutemailer } from "react-icons/si";

const CommentField = ({ postId }) => {
  const [newComment, setNewComment] = useState("");
  const [comment] = useCommentMutation();

  const handleNewComment = async () => {
    const credentials = {
      postId,
      comment: newComment,
      picsPath: "",
    };

    try {
      // Assuming you have the necessary data for the like in a "credentials" object
      const newComment = await comment(credentials).unwrap();
      console.log(newComment);
      setNewComment("");
      //   dispatch(setPost({ post: updatedPost }));
    } catch (error) {
      //? Handle error here
      HttpErrorHandler.spitHttpErrorMsg(error);
    }
  };

  return (
    <div className="flex gap-2.5 items-center w-full border-t border-[#ccc] pt-2">
      <div className="rounded-full h-[50px] w-[50px] bg-gray-400 overflow-hidden">
        {/* <img src={picsPath} alt="currentUser" className="w-full" /> */}
      </div>

      <div className="flex-1 border-2 border-[#ccc] rounded-lg h-[50px]">
        <input
          name="newComment"
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="outline-none border-none pl-2 w-full h-full"
          placeholder="Say something..."
          autoComplete="false"
        />
      </div>

      <button
        className="outline-none p-1.5"
        onClick={() => {
          newComment && handleNewComment();
        }}
      >
        <SiMinutemailer className="text-2xl" />
      </button>
    </div>
  );
};

export default CommentField;
