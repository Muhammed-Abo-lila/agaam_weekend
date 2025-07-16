"use client";
import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";
import { useEffect } from "react";
import dynamic from "next/dynamic";
const FroalaEditorComponent = dynamic(() => import("react-froala-wysiwyg"), {
  ssr: false,
});
const FloaraTextEditor = ({ fn, value, name, placeholder, type }) => {
  useEffect(() => {
    // Only import Froala JS plugins on the client
    import("froala-editor/js/plugins.pkgd.min.js");
    import("froala-editor/js/plugins/image.min.js");
  }, []);
  const imageUploadURL =
    typeof window !== "undefined"
      ? window.location.origin.replace(/\/en$/, "") + "/api/upload-image"
      : "/api/upload-image";
  const config = {
    placeholderText: placeholder,
    imageUpload: true,
    imageUploadURL: imageUploadURL,
    imageUploadParam: "file",
    imageUploadURL: "/api/upload-image",
    imageAllowedTypes: ["jpeg", "jpg", "png"],
    // direction: type=="en"?"ltr":"rtl",
    paragraphDefaultSelection: type === "ar" ? "R" : "L",
    pluginsEnabled: [
      "fontFamily",
      "fontSize",
      "align",
      "lineHeight",
      "link",
      "image",
      "colors",
      "file",
      "specialCharacters",
      "undo",
      "quote",
      "lists",
      "video",
    ],
    toolbarButtons: [
      "fontFamily",
      "fontSize",
      "bold",
      "italic",
      "underline",
      "lineHeight",
      "textColor",
      "backgroundColor",
      "align",
      "subscript",
      "insertLink",
      "insertFile",
      "insertImage",
      "insertVideo",
      "specialCharacters",
      "undo",
      "redo",
    ],
    lineHeights: {
      "1.0": "1",
      1.5: "1.5",
      "2.0": "2",
      2.5: "2.5",
      "3.0": "3",
    },
    videoInsertButtons: ["videoByURL", "videoEmbed"],
    htmlAllowedTags: ["iframe", ".*"],
    htmlAllowedAttrs: [
      "src",
      "width",
      "height",
      "frameborder",
      "allowfullscreen",
      ".*",
    ],
    fontFamilyDefaultSelection: "'IBM Plex Sans Arabic', sans-serif",
    fontFamily: {
      "Arial,Helvetica,sans-serif": "Arial",
      "Georgia,serif": "Georgia",
      "Impact,Charcoal,sans-serif": "Impact",
      "Tahoma,Geneva,sans-serif": "Tahoma",
      "Times New Roman,Times,serif": "Times New Roman",
      "Verdana,Geneva,sans-serif": "Verdana",
      "Cairo,sans-serif": "Cairo",
      "'IBM Plex Sans Arabic', sans-serif": "IBM Plex Sans Arabic",
    },
    fontSizeSelection: true,
    fontSize: ["8", "10", "12", "14", "16", "18", "24", "36"],
    paragraphFormat: {
      N: "Normal",
      R: "Right",
      L: "Left",
      C: "Center",
    },
    htmlExecuteScripts: true,
  };

  const handleChange = (content) => {
    fn(name, content);
  };
  return (
    <div className="col-6 mb-3">
      <FroalaEditorComponent
        config={config}
        tag="textarea"
        model={value || " "}
        onModelChange={(newContent) => handleChange(newContent)}
      />
    </div>
  );
};

export default FloaraTextEditor;
