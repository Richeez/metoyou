/* eslint-disable react/prop-types */
import Profile from "../profile/profile";
import { StyledStatus } from "./styledStatus";

const Status = ({ /* profiles */ sliderRef, picsPath, username, id }) => {
  return (
    <StyledStatus ref={sliderRef}>
      <Profile status icon img={picsPath} name={username} id={id} />
      {/* {profiles?.map((profile) => (
        <Profile
          status
          key={profile?.id}
          img={profile?.img}
          name={profile?.username}
        />
      ))} */}
    </StyledStatus>
  );
};

export default Status;
