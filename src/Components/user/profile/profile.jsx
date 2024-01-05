/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import React from "react";
import { StyledProfile } from "./styledProfile";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";
import { selectCurrentUser } from "../../../manager/auth/authSlice";

const Profile = ({
  profile,
  img,
  id,
  name,
  size = "70px",
  status,
  pics,
  icon,
  radius = "50%",
}) => {
  console.log("🚀 ~ file: profile.jsx:21 ~ pics:", pics);
  console.log("🚀 ~ file: profile.jsx:21 ~ img:", img);
  const navigate = useNavigate();

  const { username } = useSelector(selectCurrentUser);

  const nickname = name !== username ? `${name}` : "Your Story";
  return (
    <StyledProfile>
      <div
        style={{
          width: size,
          height: size,
          cursor: `${profile ? "pointer" : "default"}`,
          borderRadius: radius,
        }}
        onClick={profile ? () => navigate(`/profile/${id}`) : null}
        className="img_wrapper"
      >
        {(img?.length !== 0 || pics) && (
          <img
            src={`${
              img ? `${img[0]?.url}` : pics ? `/${pics}` : "/default-user.png"
            }`}
            alt="avatar"
            loading="lazy"
          />
        )}
      </div>
      <div className="text tac">{status ? <p>{nickname}</p> : null}</div>
      {icon ? (
        <span className="add">
          <AiOutlinePlus className="icon" />
        </span>
      ) : null}
    </StyledProfile>
  );
};

export default React.memo(Profile);
