/* eslint-disable react/prop-types */
// import { useContext } from "react";
import { useState, useEffect } from "react";
import {
  BiBlock,
  BiFingerprint,
  BiLogOut,
  BiMessage,
  BiSelection,
  BiSupport,
} from "react-icons/bi";
import { BsCameraVideo, BsShieldExclamation } from "react-icons/bs";
import { CgAddR, CgMail } from "react-icons/cg";
import {
  FaBusinessTime,
  FaChevronLeft,
  FaChevronRight,
  FaCogs,
  FaGuilded,
  FaSms,
  FaUserFriends,
} from "react-icons/fa";
import { GoHome } from "react-icons/go";
import {
  IoIosSwitch,
  IoMdCall,
  IoMdNotificationsOutline,
} from "react-icons/io";
import { CSSTransition } from "react-transition-group";
import { Switch } from "../../../features";
import Profile from "../../profile/profile";
import { Dropdown } from "./styledDropdown";
import { logOut, selectCurrentUser } from "../../../../manager/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { VscWorkspaceTrusted } from "react-icons/vsc";

const DropDownMenu = ({
  viewState,
  menuHeight,
  calcHeight,
  Navigate,
  trustDevice,
  persist,
  navbarRef,
}) => {
  const [activeMenu, setActiveMenu] = useState("main");
  const { _id, picsPath } = useSelector(selectCurrentUser);

  useEffect(() => {
    calcString();
  }, []);

  const dispatch = useDispatch();
  const location = useLocation();

  const calcString = (string) => {
    let stringLength = string?.length;

    if (stringLength > 8) {
      return "move_to_left";
    }

    return;
  };

  function DropDownItem(props) {
    return (
      <>
        <li
          data-desc={props.title}
          onClick={
            props?.exec ? (
              () => dispatch(props?.exec)
            ) : props?.goTo ? (
              <Navigate to={props?.goTo} state={{ from: location }} replace />
            ) : null
          }
          className="dropdown_menu_item"
        >
          {props.leftIcon && (
            <span
              onClick={
                props?.goLeft
                  ? () => props.goToMenu && setActiveMenu(props.goToMenu)
                  : null
              }
              className="left_icon icon"
            >
              {props.leftIcon}
            </span>
          )}
          {props.img && <span className="img_cont">{props.img}</span>}
          {props.heading && (
            <p className={`heading bold tac ${calcString(props.heading)}`}>
              {props.heading}
            </p>
          )}
          {props.children}
          {props.rightIcon && (
            <span
              onClick={
                props?.goRight
                  ? () => props.goToMenu && setActiveMenu(props.goToMenu)
                  : null
              }
              className="right_icon icon"
            >
              {props.rightIcon}
            </span>
          )}
        </li>
      </>
    );
  }
  return (
    <Dropdown
      ref={navbarRef}
      className={`${viewState}`}
      style={{ height: menuHeight }}
    >
      <CSSTransition
        in={activeMenu === "main"}
        onEnter={calcHeight}
        unmountOnExit
        timeout={500}
        classNames="menu-primary"
      >
        <div className="menu">
          <ul>
            <DropDownItem
              title={"profile"}
              img={
                <Profile
                  id={_id}
                  img={picsPath}
                  profile
                  radius="0"
                  size={"100%"}
                />
              }
            >
              My Profile
            </DropDownItem>
            <DropDownItem title={"home"} leftIcon={<GoHome />}>
              Home
            </DropDownItem>
            <DropDownItem title={"messages"} leftIcon={<BiMessage />}>
              Messages
            </DropDownItem>
            <DropDownItem
              title={"settings"}
              leftIcon={<FaCogs />}
              goRight
              rightIcon={<FaChevronRight />}
              goToMenu="settings"
            >
              Settings
            </DropDownItem>
            <DropDownItem leftIcon={<FaUserFriends />} title={"requests"}>
              Requests(249)
            </DropDownItem>
            <DropDownItem title={"create post"} leftIcon={<CgAddR />}>
              Create Post
            </DropDownItem>
            <DropDownItem title={"room"} leftIcon={<BsCameraVideo />}>
              Room
            </DropDownItem>
            <DropDownItem leftIcon={<BiFingerprint />} title={"verify account"}>
              Verify Account
            </DropDownItem>
            <DropDownItem title={"report issue"} leftIcon={<IoMdCall />}>
              Report Issue
            </DropDownItem>
            <DropDownItem exec={logOut()} leftIcon={<BiLogOut />}>
              Log Out
            </DropDownItem>
          </ul>
        </div>
      </CSSTransition>
      <CSSTransition
        in={activeMenu === "settings"}
        onEnter={calcHeight}
        unmountOnExit
        timeout={500}
        classNames="menu-secondary"
      >
        <div className="menu">
          <ul>
            <DropDownItem
              leftIcon={<FaChevronLeft />}
              goLeft
              heading={"Settings"}
              goToMenu="main"
            />
            <DropDownItem
              leftIcon={<BiBlock />}
              rightIcon={<FaChevronRight />}
              goRight
            >
              Blocked Accounts
            </DropDownItem>
            <DropDownItem
              leftIcon={<IoMdNotificationsOutline />}
              rightIcon={<FaChevronRight />}
              goRight
              goToMenu="notifications"
            >
              Notifications
            </DropDownItem>
            <DropDownItem
              leftIcon={<BsShieldExclamation />}
              rightIcon={<FaChevronRight />}
              goRight
            >
              Privacy Policy
            </DropDownItem>
            <DropDownItem
              leftIcon={<FaBusinessTime />}
              rightIcon={<FaChevronRight />}
              goRight
            >
              Terms of Service
            </DropDownItem>
            <DropDownItem
              leftIcon={<FaGuilded />}
              rightIcon={<FaChevronRight />}
              goRight
            >
              Community Guidelines
            </DropDownItem>
            <DropDownItem
              leftIcon={<BiSupport />}
              rightIcon={<FaChevronRight />}
              goRight
            >
              Support
            </DropDownItem>
            <DropDownItem
              leftIcon={<VscWorkspaceTrusted />}
              rightIcon={<Switch stick={trustDevice} trust={persist} />}
              title={"trust device"}
            >
              Trust Device
            </DropDownItem>
          </ul>
        </div>
      </CSSTransition>
      <CSSTransition
        in={activeMenu === "notifications"}
        onEnter={calcHeight}
        unmountOnExit
        timeout={500}
        classNames="menu-secondary"
      >
        <div className="menu">
          <ul>
            <DropDownItem
              leftIcon={<FaChevronLeft />}
              goLeft
              heading={"Notifications"}
              goToMenu="settings"
            />
            <DropDownItem leftIcon={<BiSelection />} rightIcon={<Switch />}>
              push notification
            </DropDownItem>
            <DropDownItem
              leftIcon={<IoIosSwitch />}
              rightIcon={<FaChevronRight />}
              goRight
            >
              manage notifications
            </DropDownItem>
            <DropDownItem leftIcon={<FaSms />} rightIcon={<Switch />}>
              SMS notification
            </DropDownItem>
            <DropDownItem leftIcon={<CgMail />} rightIcon={<Switch />}>
              email notification
            </DropDownItem>
          </ul>
        </div>
      </CSSTransition>
    </Dropdown>
  );
};

export default DropDownMenu;
