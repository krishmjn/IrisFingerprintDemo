import React from "react";
import FileUpload from "../../Components/FileUpload/FileUpload";
import { Button } from "antd";

const Search = () => {
  return (
    <div>
      <label>Upload file : </label>
      <br></br>
      <FileUpload style={{ marginTop: "10px" }} />

      <Button type="primary" disabled style={{ marginTop: "20px" }}>
        Live Capture
      </Button>
    </div>
  );
};

export default Search;
