import React from "react";
import PropTypes from "prop-types";
import { Box } from "@material-ui/core";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";

EditorProduct.propTypes = {
  defaultValue: PropTypes.string,
  onChange: PropTypes.func,
};

function EditorProduct({ defaultValue = "", onChange }) {
  const handleChange = (content) => {
    if (onChange) onChange(content);
  };
  return (
    <Box>
      <SunEditor
        defaultValue={defaultValue}
        onChange={handleChange}
        height="400px"
        setOptions={{
          buttonList: [
            ["undo", "redo"],
            ["font", "fontSize"],
            ["paragraphStyle", "blockquote"],
            ["bold", "underline", "italic", "strike"],
            ["fontColor", "hiliteColor"],
            ["align", "list", "lineHeight"],
            ["outdent", "indent"],
            ["table", "horizontalRule", "link", "image", "video"],
            ["fullScreen", "showBlocks", "codeView"],
            ["preview", "print"],
            ["removeFormat"],
          ],
          defaultTag: "div",
          minHeight: "300px",
          showPathLabel: false,
        }}
      />
    </Box>
  );
}

export default EditorProduct;
