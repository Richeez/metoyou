/* eslint-disable react/prop-types */

const ImageBox = ({ src, curve, others, onclick, preview }) => {
  return (
    <div
      onClick={onclick}
      style={{
        borderRadius: curve ? "1rem" : "",
        ...others,
      }}
    >
      {src ? (
        <img
          src={src}
          style={{
            objectFit: preview ? " contain" : "cover",
            objectPosition: "center",
            aspectRatio: preview ? "" : "1/1",
            width: " 100%",
            height: "100%",
          }}
          loading="lazy"
          alt="post image"
        />
      ) : null}
    </div>
  );
};

export default ImageBox;
