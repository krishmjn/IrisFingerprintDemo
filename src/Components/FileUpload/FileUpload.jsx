import React from "react";
import { UploadOutlined } from "@ant-design/icons";
import { Button, message, Upload } from "antd";
// const props = {
//   // name: "file",
//   // action: "https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload",
//   // headers: {
//   //   authorization: "authorization-text",
//   // },
//   onChange(info) {
//     console.log(info, 999);
//     // if (info.file.status !== "uploading") {
//     //   console.log(info.file, info.fileList);
//     // }
//     // if (info.file.status === "done") {
//     //   message.success(`${info.file.name} file uploaded successfully`);
//     // } else if (info.file.status === "error") {
//     //   message.error(`${info.file.name} file upload failed.`);
//     // }
//   },
// };
const FileUpload = ({ multiple, onChange }) => (
  <Upload multiple={multiple} onChange={onChange}>
    <Button icon={<UploadOutlined />}>Click to Upload</Button>
  </Upload>
);
export default FileUpload;
