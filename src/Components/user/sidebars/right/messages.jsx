import { FaSearch, FaDotCircle } from "react-icons/fa";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import "./messages.css";
import { profiles } from "../../../profile";
import Profile from "../../profile/profile";
// import { MdSettings } from "react-icons/md";
import { MdSettings } from "react-icons/md";

const Messages = () => {
  const [searchBox, setSearchBox] = useState("");

  const searching = (e) => {
    const { value } = e.target;

    setSearchBox(value);
  };

  return (
    <div className="messages">
      <h2>Messages</h2>

      <div className="search-bar">
        <span className="search-icon">
          <FaSearch />
        </span>

        <input
          type="text"
          name="search"
          onChange={(e) => searching(e)}
          value={searchBox}
          placeholder="Search messages"
        />

        <span className="filter">
          <MdSettings />
        </span>
      </div>

      <nav className="link-cont">
        <NavLink className="link isActive">Primary</NavLink>
        <NavLink className="link">General</NavLink>
        <NavLink className="link">Requests</NavLink>
      </nav>

      <div className="friends">
        {profiles?.slice(1).map((profile) => {
          const { pics, active, username } = profile ?? {};

          return (
            <div key={username} className="person">
              <Profile size={"50px"} pics={pics} />
              <div className="person-info">
                <div className="personal">
                  <div className="name-container">
                    <p className="person-name">{username}</p>
                    <FaDotCircle className="online" />
                  </div>
                  <span className="active"></span>
                </div>
                <p className="last-message"> {`Active ${active}`}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Messages;
