import { useNavigate } from "react-router-dom";
import { StyledExpSession } from "./styledExpSession";
import { NavBtn } from "../../features/button";
import { Section } from "../../features/container";

const ExpSession = () => {
  const navigate = useNavigate();
  return (
    <StyledExpSession>
      <Section>
        <p>Your Session has expired, try logging in again</p> <br />
        <NavBtn onClick={() => navigate("/login")}>Log in</NavBtn>
      </Section>
    </StyledExpSession>
  );
};

export default ExpSession;
