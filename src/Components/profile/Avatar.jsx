/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import React, { useCallback, useState } from "react";
import { StyledProfile } from "./styledProfile";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";
import { getCurrentUser } from "../../manager/auth/authSlice";

const Avatar = ({
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
  const navigate = useNavigate();
  const [isError, setIsError] = useState(false);

  const { username } = useSelector(getCurrentUser) ?? {};
  const visitProfile = useCallback(
    (userId) => {
      navigate(`/profile/${userId}`);
    },
    [id]
  );

  const handleImageError = (error) => {
    setIsError(error);
  };

  const getActiveImage = () => {
    let imageUrl = "/default-user.png";
    if (!isError) {
      if (img?.length > 0) {
        imageUrl = img[0].url;
      }
      if (pics) {
        imageUrl = `/${pics}`;
      }
    }
    return imageUrl;
  };

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
        onClick={profile ? () => visitProfile(id) : null}
        className="img_wrapper"
      >
        <img
          src={getActiveImage()}
          alt="avatar"
          loading="lazy"
          onError={(e) => handleImageError(e)}
        />
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

export default React.memo(Avatar);
