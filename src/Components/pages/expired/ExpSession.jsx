import { useNavigate } from "react-router-dom";
import { StyledExpSession } from "./styledExpSession";
import { NavBtn } from "../../features/button";
import { Section } from "../../features/container";
import PropTypes from "prop-types";

const ExpSession = ({ location }) => {
  console.log("🚀 ~ ExpSession ~ location:", location);
  const navigate = useNavigate();

  const redirect = () => {
    navigate("/login", { state: { from: location }, replace: true });
  };
  return (
    <StyledExpSession>
      <Section>
        <p>Your Session has expired, try logging in again</p> <br />
        <NavBtn onClick={redirect}>Log in</NavBtn>
      </Section>
    </StyledExpSession>
  );
};

ExpSession.propTypes = {
  location: PropTypes.object,
};

export default ExpSession;
