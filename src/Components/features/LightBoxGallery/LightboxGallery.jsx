import { useState } from "react";
import Carousel from "react-elastic-carousel";
import "./LightboxGallery.css";
import PropTypes from "prop-types";
import { renderFileType } from "../../../constants/reusables";

const LightBoxGallery = ({ children, files, imgIndex, setImgIndex }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openLightBox = () => {
    // if (typeof index === "object" && index.index !== undefined) {
    //   selectedIndex = index.index;
    // } else {
    //   selectedIndex = index;
    // }
    setIsOpen(true);
  };

  const closeLightBox = () => {
    setIsOpen(false);
    setImgIndex(0);
  };

  return (
    <div className="gallery">
      <div className="gallery-item" onClick={openLightBox}>
        {children}
      </div>

      {isOpen && (
        <div className="lightbox-gallery">
          <div className="close-button" onClick={closeLightBox}>
            X
          </div>
          <Carousel
            itemsToShow={1}
            enableAutoPlay={false}
            initialActiveIndex={imgIndex ?? 0} // This should correctly set the current index of the Carousel
            onChange={(index) => setImgIndex(index)} // This updates the image index when the Carousel index changes
          >
            {files.map((file, index) => (
              <div style={{ width: "clamp( 200px, 30rem, 65vw)" }} key={index}>
                {renderFileType(file)}
              </div> // Ensure that each image has a unique key
            ))}
          </Carousel>
        </div>
      )}
    </div>
  );
};

LightBoxGallery.propTypes = {
  files: PropTypes.array,
  children: PropTypes.node,
  imgIndex: PropTypes.number,
  setImgIndex: PropTypes.func,
};

export default LightBoxGallery;
