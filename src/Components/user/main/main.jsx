/* eslint-disable react/prop-types */
import { useState } from "react";
import { Navigate } from "react-router-dom";

import { Home } from "../../pages";
import StartFromTop from "../../StartFromTop";
import DeskNavBar from "../navbar/desktop/deskNavBar";
import DropDownMenu from "../navbar/dropdown/DropDownMenu";
import MobNavBar from "../navbar/mobile/mobNavBar";
import NavBar from "../navbar/navBar";

const MainContent = ({ trustDevice, persist }) => {
  const [open, setOpen] = useState(false);
  const [menuHeight, setMenuHeight] = useState(null);

  const calcHeight = (e) => {
    const height = e?.offsetHeight;
    setMenuHeight(height);
  };

  const handleMenu = () => {
    calcHeight();
    setOpen((prev) => !prev);
  };

  // useEffect(() => {
  //   calcHeight();
  // }, [menuHeight]);

  return (
    <div id="main">
      <StartFromTop />
      <NavBar>
        <DeskNavBar Navigate={Navigate} handleMenu={handleMenu} />
        <MobNavBar Navigate={Navigate} handleMenu={handleMenu} />
        <DropDownMenu
          trustDevice={trustDevice}
          persist={persist}
          menuHeight={menuHeight}
          calcHeight={calcHeight}
          Navigate={Navigate}
          viewState={open ? "reveal" : ""}
        />
      </NavBar>
      <Home />
    </div>
  );
};

export default MainContent;
