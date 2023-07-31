import React, { useRef } from "react";
import "quill/dist/quill.snow.css";
import ReactQuill from "react-quill";

const modules = {
  toolbar: [
    [{ size: ["small", false, "large", "huge"] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "image"],
    [{ video: "Insert Video" }],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
      { align: [] },
    ],
    [
      {
        color: [
          "#000000",
          "#e60000",
          "#ff9900",
          "#ffff00",
          "#008a00",
          "#0066cc",
          "#9933ff",
          "#ffffff",
          "#facccc",
          "#ffebcc",
          "#ffffcc",
          "#cce8cc",
          "#cce0f5",
          "#ebd6ff",
          "#bbbbbb",
          "#f06666",
          "#ffc266",
          "#ffff66",
          "#66b966",
          "#66a3e0",
          "#c285ff",
          "#888888",
          "#a10000",
          "#b26b00",
          "#b2b200",
          "#006100",
          "#0047b2",
          "#6b24b2",
          "#444444",
          "#5c0000",
          "#663d00",
          "#666600",
          "#003700",
          "#002966",
          "#3d1466",
          "custom-color",
        ],
      },
    ],
  ],
};

const formats = [
  "header",
  "height",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "color",
  "bullet",
  "indent",
  "link",
  "image",
  "align",
  "size",
  "video",
];

const TextEditor = ({ setBody, defaultValue }) => {
  const handleProcedureContentChange = (content) => {
    // console.log("content---->", content);
    setBody(content);
  };
  const handleVideoInsertion = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "video/*");
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const videoDataUrl = event.target.result;
          const editor = quillRef.current.getEditor();
          const range = editor.getSelection();
          editor.insertEmbed(range.index, "video", videoDataUrl, "user");
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  const quillRef = useRef();

  // Add a custom video button to the toolbar
  const CustomToolbar = () => (
    <div id="toolbar">
      <button onClick={handleVideoInsertion}>Insert Video</button>
    </div>
  );
  return (
    <div
      style={{
        marginBottom: 10,
        width: "100%",
        justifyContent: "center",
      }}
    >
      {/* <div style={{ display: "grid" }}> */}
      {/* <CustomToolbar /> */}
      <ReactQuill
        theme="snow"
        modules={modules}
        formats={formats}
        placeholder="write your article here ...."
        defaultValue={defaultValue}
        onChange={handleProcedureContentChange}
        style={{ height: "350px", marginBottom: "10px" }}
      />
    </div>
  );
};

export default TextEditor;
