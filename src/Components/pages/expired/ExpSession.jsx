import { useNavigate } from "react-router-dom";
import { StyledExpSession } from "./styledExpSession";
import { NavBtn } from "../../features/button";
import { Section } from "../../features/container";
// import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { logOut } from "../../../manager/auth/authSlice";

const ExpSession = () => {
  // console.log("🚀 ~ ExpSession ~ location:", location);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const redirect = () => {
    dispatch(logOut());
    navigate("/login");
  };
  return (
    <StyledExpSession>
      <Section>
        <p style={{ fontSize: "clamp(16px, 3vw, 24px)" }}>
          Your Session has expired, try logging in again
        </p>{" "}
        <br />
        <NavBtn onClick={redirect}>Log in</NavBtn>
      </Section>
    </StyledExpSession>
  );
};

// ExpSession.propTypes = {
//   location: PropTypes.object,
// };

export default ExpSession;
