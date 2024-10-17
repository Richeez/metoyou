/* eslint-disable react/prop-types */
const Comment = ({ author, content, timestamp, username, picsPath }) => {
  const handleInputChange = (e) => {
    console.log("Comment input:", e.target.value);
  };

  return (
    <>
      <div>
        <input
          type="text"
          placeholder="Add a comment..."
          onChange={handleInputChange}
          style={{
            width: "100%",
            padding: "8px",
            marginBottom: "10px",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        />
      </div>
      <div
        style={{
          marginBottom: "10px",
          padding: "10px",
          border: "1px solid #ccc",
          borderRadius: "4px",
        }}
      >
        <h4 style={{ margin: 0 }}>{author}</h4>
        <p style={{ margin: "5px 0", color: "#555" }}>@{username}</p>
        {picsPath && (
          <img
            src={picsPath}
            alt={`${username}'s pic`}
            style={{
              width: "100%",
              height: "auto",
              margin: "5px 0",
              objectFit: "cover",
              borderRadius: "4px",
            }}
          />
        )}
        <p style={{ margin: "5px 0" }}>{content}</p>
        <p style={{ fontSize: "12px", color: "#888" }}>{timestamp}</p>
      </div>
    </>
  );
};

export default Comment;
