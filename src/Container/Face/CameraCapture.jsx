import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import ButtonReusable from "../../Components/Buttons/ButtonReusable";

const CameraComponent = ({ closeModal }) => {
  const webcamRef = useRef(null);
  const [photo, setPhoto] = useState(null);

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setPhoto(imageSrc);

    // Stop the camera stream
    const video = webcamRef.current?.video;
    const stream = video?.srcObject;
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      video.srcObject = null;
      closeModal();
    }
  };

  const recapture = () => {
    setPhoto(null);
  };

  return (
    <div>
      {!photo && (
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          width={400}
          height={300}
          videoConstraints={{ facingMode: "user" }}
        />
      )}
      <br />
      {!photo && <ButtonReusable onClick={capture} text={"Capture photo"} />}
      {photo && (
        <div>
          <h4>Captured Photo:</h4>
          <img src={photo} alt="Captured" width="400" />
          <button onClick={recapture}>Recapture</button>
        </div>
      )}
    </div>
  );
};

export default CameraComponent;
