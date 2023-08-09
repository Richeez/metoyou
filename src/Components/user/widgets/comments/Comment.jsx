/* eslint-disable react/prop-types */
const Comment = ({ author, content, timestamp }) => {
  return (
    <>
      <div>
        <input type="text" />
      </div>
      <div
        style={{
          marginBottom: "10px",
          padding: "10px",
          border: "1px solid #ccc",
        }}
      >
        <h4 style={{ margin: 0 }}>{author}</h4>
        <p style={{ margin: "5px 0" }}>{content}</p>
        <p style={{ fontSize: "12px", color: "#888" }}>{timestamp}</p>
      </div>
    </>
  );
};

export default Comment;
