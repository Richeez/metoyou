import { StyledExplore } from "./styledExplore";
import { useRef } from "react";

const Explore = () => {
  const sliderRef = useRef(null);

  const slideFunc = (direction) => {
    const slider = sliderRef?.current;

    if (direction === "left") {
      slider.scrollBy(-200, 0);
    } else {
      slider.scrollBy(200, 0);
    }
  };

  return (
    <StyledExplore>
      <div className="explore-head">
        <h2>Explore</h2>
        <span className="see-all">See all</span>
      </div>

      <nav>
        <ul ref={sliderRef}>
          <span onClick={() => slideFunc("left")} className="prev">
            &#10094;
          </span>
          <span onClick={() => slideFunc("right")} className="next">
            &#10095;
          </span>
          <li>Connect</li>
          <li>Communities</li>
          <li>Website</li>
          <li>Interests</li>
        </ul>
      </nav>

      <div className="all-exp-images">
        <div className="upp-img-div">
          <div className="exp-images-cont col1">
            <img src="/profile-2.jpg" alt="" />
          </div>

          <div className="exp-images-cont col2">
            <img src="/profile-3.jpg" alt="" />
          </div>

          <div className="exp-images-cont right-image">
            <img src="/moses-bliss.jpg" alt="" />
          </div>

          <div className="exp-images-cont col3">
            <img src="/elon-musk.jpg" alt="" />
          </div>

          <div className="exp-images-cont col4">
            <img src="/facts.jpg" alt="" />
          </div>
        </div>

        <div className="botm-exp-images">
          <div className="exp-images-cont left-image">
            <img src="/elon-musk.jpg" alt="" />
          </div>

          <div className="exp-images-cont col1">
            <img src="/testimony.jpg" alt="" />
          </div>

          <div className="exp-images-cont col2">
            <img src="/cutty.png" alt="" />
          </div>

          <div className="exp-images-cont col4">
            <img src="/dev-harrison.jpg" alt="" />
          </div>

          <div className="exp-images-cont col5">
            <img src="/cynthia.jpeg" alt="" />
          </div>
        </div>
      </div>
    </StyledExplore>
  );
};

export default Explore;
