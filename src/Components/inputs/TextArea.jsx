import { useState } from "react";

const TextArea = () => {
  const [description, setDescription] = useState("");
  const [textareaHeight, setTextareaHeight] = useState("auto"); // Initial height

  const handleChange = (event) => {
    const { value } = event.target;
    setDescription(value);

    // Calculate the new height based on the content
    const lineHeight = 20; // Adjust this value based on your font size
    const minRows = 1; // Minimum number of rows
    const maxRows = 10; // Maximum number of rows
    const newRows = Math.min(
      maxRows,
      Math.max(minRows, Math.ceil(event.target.scrollHeight / lineHeight))
    );
    const newHeight = newRows * lineHeight + "px";
    setTextareaHeight(newHeight);
  };
  const handleDelete = () => {
    // If the text is cleared, reset the textarea height to the initial value
    if (description === "") {
      setTextareaHeight("auto");
    }
  };

  return (
    <div className="textarea-container">
      <textarea
        className="textarea"
        style={{ height: textareaHeight }}
        value={description}
        onKeyDown={handleDelete}
        onChange={handleChange}
        placeholder="Let out your mind"
      />
    </div>
  );
};

export default TextArea;
