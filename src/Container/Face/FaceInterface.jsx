import React, { useState } from "react";
import FileUpload from "../../Components/FileUpload/FileUpload";
import CameraComponent from "./CameraCapture";

import ButtonReusable from "../../Components/Buttons/ButtonReusable";
import StyledModal from "../../Components/Modal/StyledModal";

const FaceInterface = () => {
  const [liveCaptureModalOpen, setLiveCaptureModalOpen] = useState(false);

  return (
    <div>
      <FileUpload />
      <ButtonReusable
        text={"Live Capture"}
        style={{ marginTop: "10px" }}
        onClick={() => setLiveCaptureModalOpen(true)}
      />
      <StyledModal
        visible={liveCaptureModalOpen}
        onCancel={() => setLiveCaptureModalOpen(false)}
        footer={null}
      >
        <CameraComponent closeModal={() => setLiveCaptureModalOpen(false)} />
      </StyledModal>
    </div>
  );
};

export default FaceInterface;
