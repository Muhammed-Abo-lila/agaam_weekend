"use client";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
const TextEditor = ({ fn, value, name, placeholder, type }) => {
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
      [{ font: [] }],
      [{ align: [] }],
      ["clean"],
    ],
  };
  const handleChange = (content) => {
    fn(name, content);
  };
  return (
    <div className={`mb-3 col-6`}>
      <ReactQuill
        className={`ql-direction ${type == "ar" && "react-quill-custom-class"}`}
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
