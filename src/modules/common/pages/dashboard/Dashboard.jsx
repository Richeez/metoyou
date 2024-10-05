import { useRef } from "react";
import { StyledHome } from "./styledHome";
import { profiles } from "../../../../Components/profile";
// import {
//   LeftSideBar,
//   PostField,
//   RightSideBar,
//   StartFromTop,
//   Status,
// } from "../../../../Components/user";
import { useSelector } from "react-redux";
import { getCurrentUser } from "../../../../manager/auth/authSlice";
import { Section } from "../../../../Components/container";
import StartFromTop from "../../../../Components/StartFromTop";
import Status from "./components/status/Status";
import RightSideBar from "../../../../layouts/sidebars/right/right";
import LeftSideBar from "../../../../layouts/sidebars/left/left";
import PostsWidget from "../../../posts/components/post/postsWidget";
import PostField from "../../../posts/components/postField/PostField";

const Home = () => {
  const sliderRef = useRef(null);

  const slideFunc = (direction) => {
    const slider = sliderRef?.current;

    if (direction === "left") {
      slider.scrollBy(-200, 0);
    } else {
      slider.scrollBy(200, 0);
    }
  };
  const { username, picsPath, _id } = useSelector(getCurrentUser) ?? {};
  return (
    <>
      <StartFromTop />
      <StyledHome>
        <Section>
          <LeftSideBar />
          <div className="grid dashboard ">
            <div className="item">
              <span onClick={() => slideFunc("left")} className="prev">
                &#10094;
              </span>
              <span onClick={() => slideFunc("right")} className="next">
                &#10095;
              </span>
              <Status
                username={username}
                id={_id}
                picsPath={picsPath}
                sliderRef={sliderRef}
                profiles={profiles}
              />
            </div>
            <div className="item">
              <PostField />
            </div>
            <PostsWidget userId={_id} />
          </div>
          <RightSideBar />
        </Section>
      </StyledHome>
    </>
  );
};

export default Home;
