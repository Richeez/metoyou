import { FaUserPlus } from "react-icons/fa";
import Profile from "../../profile/profile";
import "./Suggestions.css";

const Suggestions = () => {
  const suggestions = [
    {
      pics: "cinderella.jpeg",
      username: "Cinderella",
      msg: "Recently",
    },
    {
      pics: "cynthia.jpeg",
      username: "Cynthia Morgan",
      msg: "Suggested for you",
    },
    {
      pics: "patrick.jpeg",
      username: "CP Abiodun Alabi",
      msg: "Followed by Bella Cory",
    },
    {
      pics: "smart.jpeg",
      username: "Smart",
      msg: "Suggested for you",
    },
    {
      pics: "derick.jpeg",
      username: "Derick",
      msg: "Followed by Maloney",
    },
  ];
  return (
    <div className="suggestions">
      <div className="upper-most">
        <h2>Suggested For You</h2>
        <span className="see-all">See all</span>
      </div>

      <div className="all-suggestion">
        {suggestions?.map((suggestion) => {
          const { pics, username, msg } = suggestion ?? {};
          return (
            <div key={username} className="add-new">
              <Profile size={"50px"} pics={pics} />
              <div className="new-name">
                <p>{username}</p>
                <span className="time">{msg}</span>
              </div>

              <div className="add-icon">
                <FaUserPlus />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Suggestions;
