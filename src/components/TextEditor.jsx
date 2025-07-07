"use client";
import React, { useRef, useEffect } from "react";
import ReactQuill, { Quill } from "react-quill-new";
import ImageResize from "quill-image-resize-module-react";
import "react-quill-new/dist/quill.snow.css";

const Size = Quill.import("formats/size");
Size.whitelist = ["8", "9", "10", "11", "12", "13", "14", "16", "18", "24", "36"];
Quill.register(Size, true);
Quill.register("modules/imageResize", ImageResize);
const TextEditor = ({ fn, value, name, placeholder, type }) => {
  const quillRef = useRef();
  const modules = {
    toolbar: [
      ["bold", "italic", "underline", "strike"],
      ["blockquote", "code-block"],
      ["link", "image"],
      [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
      [{ script: "sub" }, { script: "super" }],
      [{ indent: "-1" }, { indent: "+1" }],
      [{ direction: "rtl" }, { align: "right" }],
      [{ size: ["8", "9", "10", "11", "12", "13", "14", "16", "18", "24", "36"] }],
      [{ header: [2, 3, 4, 5, 6, false] }],
      [{ font: [] }],
      [{ align: [] }],
      ["clean"],
    ],
    imageResize: {
      modules: ["Resize", "DisplaySize", "Toolbar"],
    },
  };
  useEffect(() => {
    if (quillRef.current) {
      const quill = quillRef.current.getEditor();
      quill.clipboard.addMatcher(Node.ELEMENT_NODE, (node, delta) => {
        delta.ops.forEach((op) => {
          if (op.attributes) {
            delete op.attributes.color;
            delete op.attributes.background;
          }
        });
        return delta;
      });
    }
  }, []);

  const handleChange = (content) => {
    fn(name, content);
  };

  return (
    <div className="mb-3 col-6">
      <ReactQuill
        ref={quillRef}
        className={`bg-white react-quill ${type === "ar" ? "react-quill-custom-class" : ""}`}
        theme="snow"
        modules={modules}
        value={value || ""}
        onChange={handleChange}
        placeholder={placeholder}
      />
    </div>
  );
};

export default TextEditor;
