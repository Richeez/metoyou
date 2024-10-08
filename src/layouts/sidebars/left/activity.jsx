import { FaUserPlus } from "react-icons/fa";
import { StyledActivity } from "./styledActivity";
import { useSelector } from "react-redux";
import Avatar from "../../../Components/profile/Avatar";
import { getCurrentUser } from "../../../manager/auth/authSlice";

const Activity = () => {
  const suggestions = [
    {
      pics: "cinderella.jpeg",
      username: "Cinderella",
      msg: "started following you",
      timeStamp: "2h",
      icon: <FaUserPlus />,
    },
    {
      pics: "cynthia.jpeg",
      username: "Cynthia Morgan",
      msg: "liked your photo",
      timeStamp: "1h",
      postImg: "facts.jpg",
    },
    {
      pics: "patrick.jpeg",
      username: "CP Abiodun Alabi",
      msg: "started following you",
      timeStamp: "3m",
      icon: <FaUserPlus />,
    },
    {
      pics: "smart.jpeg",
      username: "Smart",
      msg: "liked your photo",
      timeStamp: "2m",
      postImg: "profile-pic.png",
    },
    {
      pics: "derick.jpeg",
      username: "Derick",
      msg: "Started following you",
      timeStamp: "1m",
      icon: <FaUserPlus />,
    },
  ];

  const { picsPath } = useSelector(getCurrentUser) ?? {};

  return (
    <StyledActivity>
      <div className="upper-most">
        <h2>activity</h2>
        <span className="see-all">See all</span>
      </div>
      <div className="heading">
        <h3>stories about you</h3>
      </div>
      <div className="mentions">
        <div className="mention">
          <Avatar img={picsPath} size={"50px"} />
          <div className="texts">
            <p className="bold">mentions</p>
            <span className="msg">Two stories mention you</span>
          </div>
        </div>
      </div>
      <div className="heading">
        <h3>New</h3>
      </div>

      <div className="all-suggestion">
        {suggestions?.map((suggestion) => {
          const { pics, username, msg, timeStamp, icon } = suggestion ?? {};
          return (
            <div key={username} className="add-new">
              <Avatar size={"50px"} pics={pics} />
              <div className="new-name">
                <p>{username}</p>
                <span>{msg}</span>&nbsp;
                <span className="time">{timeStamp}.</span>
              </div>

              {icon ? (
                <div className="add-icon">{icon}</div>
              ) : (
                <div className="image">
                  <img src={`/facts.jpg`} alt="postImg" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </StyledActivity>
  );
};

export default Activity;
