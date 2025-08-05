import React, { useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import { Button, Checkbox, Upload } from "antd";
import { fileToBase64 } from "../../Container/Fingerprint/helper";
// import { handleFileChange } from "../../Container/Fingerprint/helper";

const FileUpload = ({
  multiple,
  onChange,
  fingerPrintData,
  selectedFinger,
  imageOf,
  allowedFileTypes,
}) => {
  const handleFileChange = async (e) => {
    const file = e.file.originFileObj;
    if (file) {
      const base64 = await fileToBase64(file);
      onChange(base64);
      console.log("Base64 string:", base64);
      // send base64 to backend here
    }
  };
  return (
    <>
      <Upload
        multiple={multiple}
        // onChange={onChange}
        onChange={(e) => handleFileChange(e)}
        accept={allowedFileTypes}
        fileList={
          fingerPrintData?.[selectedFinger]?.filePath
            ? [
                {
                  uid: "-1",
                  name: fingerPrintData[selectedFinger].filePath,
                  status: "done",
                },
              ]
            : []
        }
      >
        <Button icon={<UploadOutlined />}>Click to Upload</Button>
      </Upload>
    </>
  );
};
export default FileUpload;
