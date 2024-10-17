import Activity from "./activity";
import Explore from "./explore";
import { StyledLeftSideBar } from "./styledLeft";

const LeftSideBar = () => {
  return (
    <StyledLeftSideBar>
      <div className=" grid">
        <div className="item">
          <Activity />
        </div>
        <div className="item">
          <Explore />
        </div>
      </div>
    </StyledLeftSideBar>
  );
};

export default LeftSideBar;
