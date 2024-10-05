/* eslint-disable react/prop-types */
import { useRef, useState } from "react";
import { Navigate } from "react-router-dom";

import StartFromTop from "../../Components/StartFromTop";
import NavBar from "../navbar/navBar";
import MobNavBar from "../navbar/components/mobile/mobNavBar";
import Home from "../../modules/common/pages/dashboard/Dashboard";
import DropDownMenu from "../navbar/components/dropdown/DropDownMenu";
import DeskNavBar from "../navbar/components/desktop/deskNavBar";

const MainContent = () => {
  const [open, setOpen] = useState(false);
  const [menuHeight, setMenuHeight] = useState(null);
  const deskMenuRef = useRef(null);
  const mobMenuRef = useRef(null);

  const calcHeight = (e) => {
    const height = e?.offsetHeight;
    setMenuHeight(height);
  };

  const handleMenu = (e) => {
    e.stopPropagation();

    calcHeight();
    setOpen((prev) => !prev);
  };
  /*className="unactive-screen"*/
  return (
    <div id="main">
      <StartFromTop />
      <NavBar>
        <DeskNavBar
          deskMenuRef={deskMenuRef}
          Navigate={Navigate}
          handleMenu={handleMenu}
        />
        <MobNavBar
          Navigate={Navigate}
          mobMenuRef={mobMenuRef}
          handleMenu={handleMenu}
        />
        <DropDownMenu
          menuHeight={menuHeight}
          calcHeight={calcHeight}
          Navigate={Navigate}
          viewState={open ? "reveal" : ""}
          handleDropDown={setOpen}
          deskMenuRef={deskMenuRef}
          mobMenuRef={mobMenuRef}
        />
      </NavBar>
      <Home />
    </div>
  );
};

export default MainContent;
