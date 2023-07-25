import { FaUserPlus } from "react-icons/fa";
import Profile from "../../profile/profile";
import { StyledActivity } from "./styledActivity";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../../manager/auth/authSlice";

const Activity = () => {
  const suggestions = [
    {
      img: "cinderella.jpeg",
      username: "Cinderella",
      msg: "started following you",
      timeStamp: "2h",
      icon: <FaUserPlus />,
    },
    {
      img: "cynthia.jpeg",
      username: "Cynthia Morgan",
      msg: "liked your photo",
      timeStamp: "1h",
      postImg: "facts.jpg",
    },
    {
      img: "patrick.jpeg",
      username: "CP Abiodun Alabi",
      msg: "started following you",
      timeStamp: "3m",
      icon: <FaUserPlus />,
    },
    {
      img: "smart.jpeg",
      username: "Smart",
      msg: "liked your photo",
      timeStamp: "2m",
      postImg: "profile-pic.png",
    },
    {
      img: "derick.jpeg",
      username: "Derick",
      msg: "Started following you",
      timeStamp: "1m",
      icon: <FaUserPlus />,
    },
  ];

  const { picsPath } = useSelector(selectCurrentUser);

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
          <Profile img={picsPath} size={"50px"} />
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
          const { img, username, msg, timeStamp, icon } = suggestion;
          return (
            <div key={username} className="add-new">
              <Profile profile size={"50px"} img={img} />
              <div className="new-name">
                <p>{username}</p>
                <span>{msg}</span>&nbsp;
                <span className="time">{timeStamp}.</span>
              </div>

              {icon ? (
                <div className="add-icon">{icon}</div>
              ) : (
                <div className="image">
                  <img
                    src={`https://metoyou-server.vercel.app/assets/facts.jpg`}
                    alt="postImg"
                  />
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
