"use client";
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import "./TextEditor.css";
const TextEditor = ({ fn, value, name, placeholder, type }) => {
  const [textData, setTextData] = useState(value);
  useEffect(() => {
    setTextData(value);
  }, [value]);
  const modules = {
    toolbar: [
      ["bold", "italic", "underline", "strike"],
      ["blockquote", "code-block"],
      ["link", "image"],
      [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
      [{ script: "sub" }, { script: "super" }],
      [{ indent: "-1" }, { indent: "+1" }],
      [{ direction: "rtl" }, { align: "right" }],

      [{ size: ["small", false, "large", "huge"] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],

      [{ color: [] }, { background: [] }],
      [{ font: [] }],
      [{ align: [] }],

      ["clean"],
    ],
  };
  useEffect(() => {
    fn(name, textData);
  }, [textData]);
  return (
    <div className={`mb-3 col-6`}>
      <ReactQuill
        className={`${type == "ar" && "react-quill-custom-class"}`}
        theme="snow"
        value={textData}
        onChange={setTextData}
        modules={modules}
        placeholder={placeholder}
      />
    </div>
  );
};
export default TextEditor;
