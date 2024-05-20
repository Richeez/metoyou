import PropTypes from "prop-types";
import ImageBox from "./imageBox/ImageBox";

const RenderFileType = ({
  attachment,
  index,
  setImgIndex,
  preview = false,
}) => {
  const onClickHandler = setImgIndex ? () => setImgIndex(index) : null;
  switch (attachment?.type) {
    case "image":
      return (
        <ImageBox
          // curve
          preview={preview}
          src={attachment?.url}
          others={{
            width: "100%",
            height: "100%",
            cursor: "pointer",
          }}
          onclick={onClickHandler}
        />
      );
    case "video":
      return (
        <video
          style={{ width: "100%", height: "100%", borderRadius: "1rem" }}
          controls
        >
          <source src={attachment.url} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      );
    case "file":
      return (
        <a
          href={attachment.payload.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          View Document
        </a>
      );
    default:
      return null;
  }
};

RenderFileType.propTypes = {
  attachment: PropTypes.object,
  //   attachment: PropTypes.shape({
  //     type: PropTypes.string.isRequired,
  //     url: PropTypes.string.isRequired,
  //     payload: PropTypes.shape({
  //       url: PropTypes.string.isRequired,
  //     }),
  //   }).isRequired,
  index: PropTypes.number,
  setImgIndex: PropTypes.func,
  preview: PropTypes.bool,
};

export default RenderFileType;
