/* eslint-disable react/prop-types */

const ImageBox = ({ src, curve, others, onclick }) => {
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
            objectFit: "cover",
            objectPosition: "top",
            aspectRatio: "1/1",
            width: " 100%",
            height: "100%",
          }}
          loading="lazy"
          alt="graphics"
        />
      ) : null}
    </div>
  );
};

export default ImageBox;
