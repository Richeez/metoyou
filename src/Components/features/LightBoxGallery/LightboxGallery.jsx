import { useState } from "react";
import Carousel from "react-elastic-carousel";
import "./LightboxGallery.css";
import PropTypes from "prop-types";

const LightboxGallery = ({ files }) => {
  console.log("🚀 ~ LightboxGallery ~ files:", files);
  const [isOpen, setIsOpen] = useState(true);
  const [selectedFileIndex, setSelectedFileIndex] = useState(0);

  const openLightbox = (index) => {
    console.log("🚀 ~ openLightbox ~ index:", index);
    setSelectedFileIndex(index);
    setIsOpen(true);
  };

  const closeLightbox = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <div className="gallery">
        {files.map((file, index) => (
          <div
            key={index}
            className="gallery-item"
            onClick={() => openLightbox(index)}
          >
            {/* You can use different types of file previews based on the file type */}
            {file.type.startsWith("image/") && (
              <img src={file.src} alt={file.alt} />
            )}
            {file.type.startsWith("video/") && (
              <video controls>
                <source src={file.src} type={file.type} />
              </video>
            )}
            {file.type.startsWith("audio/") && (
              <audio controls>
                <source src={file.src} type={file.type} />
              </audio>
            )}
            {!file.type.startsWith("image/") &&
              !file.type.startsWith("video/") &&
              !file.type.startsWith("audio/") && <div>{file.name}</div>}
          </div>
        ))}
      </div>

      {isOpen && (
        <div className="lightbox">
          <div className="close-button" onClick={closeLightbox}>
            X
          </div>
          <Carousel
            itemsToShow={1}
            enableAutoPlay={false}
            currentIndex={selectedFileIndex}
            onChange={(index) => setSelectedFileIndex(index)}
          >
            {files.map((file, index) => (
              <div key={index}>
                {file.type.startsWith("image/") && (
                  <img src={file.src} alt={file.alt} />
                )}
                {file.type.startsWith("video/") && (
                  <video controls>
                    <source src={file.src} type={file.type} />
                  </video>
                )}
                {file.type.startsWith("audio/") && (
                  <audio controls>
                    <source src={file.src} type={file.type} />
                  </audio>
                )}
                {!file.type.startsWith("image/") &&
                  !file.type.startsWith("video/") &&
                  !file.type.startsWith("audio/") && <div>{file.name}</div>}
              </div>
            ))}
          </Carousel>
        </div>
      )}
    </div>
  );
};

LightboxGallery.propTypes = {
  files: PropTypes.array,
};

export default LightboxGallery;
