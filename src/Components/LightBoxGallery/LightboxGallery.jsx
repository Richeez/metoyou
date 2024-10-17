import { useState } from "react";
import Carousel from "react-elastic-carousel";
import "./LightboxGallery.css";
import PropTypes from "prop-types";
import RenderFileType from "../RenderFileType";
import { CgClose } from "react-icons/cg";

const LightBoxGallery = ({ children, files, imgIndex, setImgIndex }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openLightBox = () => {
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
            <CgClose />
          </div>
          <Carousel
            itemsToShow={1}
            enableAutoPlay={false}
            initialActiveIndex={imgIndex ?? 0} // This should correctly set the current index of the Carousel
            onChange={(index) => setImgIndex(index)} // This updates the image index when the Carousel index changes
          >
            {files.map((file, index) => (
              <div
                style={{
                  display: "grid",
                  width: "500px",
                  maxWidth: "100%",
                  height: "500px",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                key={index}
              >
                <RenderFileType preview attachment={file} />
              </div>
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
