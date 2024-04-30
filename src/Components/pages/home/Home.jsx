import { useRef } from "react";
import { Section } from "../../features/container";
import { StyledHome } from "./styledHome";
import { profiles } from "../../profile";
import {
  LeftSideBar,
  PostField,
  RightSideBar,
  StartFromTop,
  Status,
} from "../../user";
import { useSelector } from "react-redux";
import { getCurrentUser } from "../../../manager/auth/authSlice";
import PostsWidget from "../../user/post/postsWidget";

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
          <div className="wrapper grid ">
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
