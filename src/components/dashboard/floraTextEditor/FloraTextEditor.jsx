import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";
import "froala-editor/js/plugins.pkgd.min.js";
import FroalaEditorComponent from "react-froala-wysiwyg";
const FloaraTextEditor = ({ fn, value, name, placeholder, type }) => {
  const config = {
    placeholderText: placeholder,
    direction: type === "ar" ? "rtl" : "ltr",
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
    '1.0': '1',
    '1.5': '1.5',
    '2.0': '2',
    '2.5': '2.5',
    '3.0': '3'
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
    fontFamilySelection: true,
    fontFamily: {
      "Arial,Helvetica,sans-serif": "Arial",
      "Georgia,serif": "Georgia",
      "Impact,Charcoal,sans-serif": "Impact",
      "Tahoma,Geneva,sans-serif": "Tahoma",
      "Times New Roman,Times,serif": "Times New Roman",
      "Verdana,Geneva,sans-serif": "Verdana",
      "Cairo,sans-serif": "Cairo",
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
