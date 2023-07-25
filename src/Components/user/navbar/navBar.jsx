/* eslint-disable react/prop-types */
import { Outlet } from "react-router-dom";
import { StyledNavBar } from "./styledNavBar";

const NavBar = ({ children }) => {
  return (
    <StyledNavBar>
      <>{children}</>
      <Outlet />
    </StyledNavBar>
  );
};

export default NavBar;
