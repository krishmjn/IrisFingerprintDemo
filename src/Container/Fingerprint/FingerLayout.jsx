import React, { useState } from "react";
import "./Hand.css";
import { Tooltip, Modal, Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import InputWithLabel from "../../Components/InputWithLabel/InputWithLabel";
import FileUpload from "../../Components/FileUpload/FileUpload";
import ButtonReusable from "../../Components/Buttons/ButtonReusable";

const Finger = ({ name, onClick }) => (
  <div className="finger" onClick={onClick}>
    <p className="text-center">
      <Tooltip title={name}>
        <img src="/fingerprint.png" height={"20px"} width={"25px"} />
      </Tooltip>
    </p>
  </div>
);

const Hand = () => {
  const [files, setFiles] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedFinger, setSelectedFinger] = useState(null);
  const [exceptionRemarks, setExceptionRemarks] = useState(null);

  const handleFileUpload = (value) => {
    const file = value.file;
    if (file && selectedFinger) {
      setFiles((prevFiles) => ({
        ...prevFiles,
        [selectedFinger]: file.name,
      }));
      setModalVisible(false);
    }
  };

  const handleExceptionRemarksChange = (remarks) => {
    if (selectedFinger) {
      setExceptionRemarks((prev) => ({
        ...prev,
        [selectedFinger]: remarks,
      }));
    }
  };
  const openModal = (fingerName) => {
    setSelectedFinger(fingerName);
    setModalVisible(true);
  };

  const fingers = [
    { label: "1", value: "Right Thumb" },
    { label: "2", value: "Right Index" },
    { label: "3", value: "Right Middle" },
    { label: "4", value: "Right Ring" },
    { label: "5", value: "Right Little" },
    { label: "6", value: "Left Thumb" },
    { label: "7", value: "Left Index" },
    { label: "8", value: "Left Middle" },
    { label: "9", value: "Left Ring" },
    { label: "10", value: "Left Little" },
  ];

  return (
    <div className="flex justify-center items-center h-screen bg-gray-800">
      <div
        className="container"
        style={{ minHeight: "15vh", width: "100%", marginTop: "10%" }}
      >
        <img
          src="/enhanced.png"
          //hand1.jpeg
          alt="hand"
          style={{ margin: "0 20%", width: "50%", height: "40%" }}
        />
        {fingers.map((finger, index) => (
          <Finger
            key={index}
            name={finger?.value}
            onClick={() => openModal(finger?.value)}
          />
        ))}

        {/* <div style={{ marginTop: "20px" }}>
          {Object.entries(files).map(([finger, path]) => (
            <p key={finger}>
              Finger: {finger}, File: {path}
            </p>
          ))}
        </div> */}

        <Modal
          title={`Upload for ${selectedFinger}`}
          open={modalVisible}
          onCancel={() => setModalVisible(false)}
          footer={null}
          centered={true}
        >
          <InputWithLabel
            label="Exception case:"
            onChange={(e) => handleExceptionRemarksChange(e.target.value)}
            // value={exceptionCaseRemarks}
          />
          <FileUpload type="file" onChange={handleFileUpload} />
          <ButtonReusable
            text="Submit"
            type="primary"
            style={{ marginTop: "10px", marginLeft: "82%" }}
          />
        </Modal>
      </div>
    </div>
  );
};

export default Hand;
