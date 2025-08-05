import React, { useRef, useState } from "react";
import "./Hand.css";
import InputWithLabel from "../../Components/InputWithLabel/InputWithLabel";
import FileUpload from "../../Components/FileUpload/FileUpload";
import ButtonReusable from "../../Components/Buttons/ButtonReusable";
import useGlobalContext from "../../contexts/Global/useGlobalContext";
import {
  fingerprintExceptions,
  fingersLayoutList,
  fingerTypeOptions,
} from "./helper";
import FingerTips from "./FingerTips";
import StyledModal from "../../Components/Modal/StyledModal";
import SelectWithLabel from "../../Components/SelectWithLabel/SelectWithLabel";
import { classifyFingerType } from "../../hooks/api/FingerPrint/ImageEnhancement/ClassifyFingerType";
import { addFingerPrint } from "../../hooks/api/FingerPrint/AddFingerPrint/AddFingerPrint";
import dayjs from "dayjs";
import FingerPrintDetail from "./FingerPrintDetail";

const FingerLayout = () => {
  const [selectedFinger, setSelectedFinger] = useState(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [detailData, setDetailData] = useState(null);
  const [submittedFingerNames, setSubmittedFingerNames] = useState([]);
  const wsRef = useRef(null);
  const {
    imageFromServer,
    setImageFromServer,
    setExceptionCaseRemarks,
    fingerPrintData,
    fingerType,
    formData,
    setFingerType,
    classifying,
    isClassifying,
    templateType,
    uploading,
    isUploading,
    setDetailedView,
    detailedView,
    fileModalVisible,
    setFileModalVisible,
    remarksModalVisible,
    setRemarksModalVisible,
  } = useGlobalContext();

  const handleExceptionRemarksChange = (remarks) => {
    if (selectedFinger) {
      setExceptionCaseRemarks(selectedFinger, remarks);
    }
  };

  const openFileModal = (fingerName) => {
    setSelectedFinger(fingerName);
    setFileModalVisible(true);
  };

  const openRemarksModal = (fingerName) => {
    setSelectedFinger(fingerName);
    setRemarksModalVisible(true);
  };

  const handleWebSocketEnroll = () => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(
        JSON.stringify({ action: "scan", finger: selectedFinger })
      );
      console.log("Message sent to server");
      return;
    }

    const ws = new WebSocket("ws://localhost:8080");

    ws.onopen = () => {
      console.log("WebSocket connected");
      setIsCapturing(true);
      ws.send(JSON.stringify({ action: "scan", finger: selectedFinger }));
    };

    ws.onmessage = (event) => {
      console.log("Message from server:", event.data);
      setImageFromServer(event.data);
      setIsCapturing(false);
    };

    ws.onerror = (error) => {
      setIsCapturing(false);
      alert("Websocket error : ", error);
      console.error("WebSocket error:", error);
    };

    ws.onclose = () => {
      console.log("WebSocket connection closed");
    };

    wsRef.current = ws;
  };

  const handleClassifyFingerType = async () => {
    if (imageFromServer) {
      try {
        isClassifying(true);
        const response = await classifyFingerType(imageFromServer);
        setFingerType(response.fingerprint_type);
        isClassifying(false);
      } catch (error) {
        console.error("Error classifying finger type:", error);
      }
    } else {
      alert("Please capture an image first.");
    }
  };

  const handleSubmit = async () => {
    isUploading(true);
    const data = {
      name: formData?.name,
      template_id: formData?.id,
      gender: formData?.gender,
      dob: dayjs(formData?.dob).format("YYYY-MM-DD"),
      image_data: imageFromServer,
      finger_name: selectedFinger,
      fingerprint_type: fingerType,
      enroll_type: templateType === "ten" ? "Live enroll" : "chance print",
      // exceptionRemarks: fingerPrintData?.[selectedFinger]?.exceptionCaseRemarks,
    };
    const res = await addFingerPrint(data);
    setDetailedView(true);
    isUploading(false);
    console.log(data, res, res?.fingerName, "data999");

    if (res?.fingerprint_metadata?.finger_name) {
      setSubmittedFingerNames((prev) => [
        ...prev,
        res?.fingerprint_metadata?.finger_name,
      ]);
    }
    setDetailData(res);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-800">
      <div
        className="container"
        style={{ minHeight: "15vh", width: "100%", marginTop: "10%" }}
      >
        <img
          src="/enhanced.png"
          alt="hand"
          style={{ margin: "0 20%", width: "50%", height: "40%" }}
        />
        {fingersLayoutList.map((finger, index) => {
          const isUploaded = submittedFingerNames.includes(finger.value); // Check against submittedFingerNames
          return (
            <FingerTips
              key={index}
              name={finger?.value}
              onClickFingerprint={() => openFileModal(finger?.value)}
              onClickCross={() => openRemarksModal(finger?.value)}
              isUploaded={isUploaded} // Combine with exception case
            />
          );
        })}

        <StyledModal
          title={`${selectedFinger}`}
          visible={fileModalVisible}
          onCancel={() => {
            setFileModalVisible(false),
              setImageFromServer(null),
              setIsCapturing(false);
          }}
          footer={null}
          centered={true}
        >
          {imageFromServer && (
            <div
              style={{
                display: "flex",
                marginTop: "10px",
                width: "100%",
                alignItems: "center",
              }}
            >
              <SelectWithLabel
                placeholder={"Select finger type"}
                options={fingerTypeOptions}
                onChange={(value) => setFingerType(value)}
                value={fingerType}
                width={"200px"}
              />
              <ButtonReusable
                text={"Detect"}
                type={"primary"}
                style={{ marginLeft: "10px", marginBottom: "5px" }}
                onClick={handleClassifyFingerType}
                loading={classifying}
              />
            </div>
          )}
          <div
            style={{
              alignItems: "center",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                marginTop: "10px",
                width: "120px",
                height: "150px",
                border: "1px solid #ccc",
                textAlign: "center",
                alignItems: "center",
              }}
            >
              {imageFromServer !== null && (
                <img src={imageFromServer} width={"100%"} height={"100%"} />
              )}
              {isCapturing && "Scanning..."}
            </div>
            <ButtonReusable
              text={isCapturing ? "Capturing" : "Capture"}
              onClick={handleWebSocketEnroll}
              style={{ marginTop: "10px" }}
            />
          </div>

          <ButtonReusable
            text="Next"
            type="primary"
            style={{ marginTop: "10px", marginLeft: "82%" }}
            onClick={handleSubmit}
            loading={uploading}
          />
        </StyledModal>

        <StyledModal
          title={`Exception Remarks for ${selectedFinger}`}
          visible={remarksModalVisible}
          onCancel={() => setRemarksModalVisible(false)}
          footer={null}
          centered={true}
        >
          <SelectWithLabel
            label={"Exception"}
            options={fingerprintExceptions}
            value={
              fingerPrintData
                ? fingerPrintData?.[selectedFinger]?.exceptionCaseRemarks
                : []
            }
            onChange={(value) => handleExceptionRemarksChange(value)}
          />
          {/* {fingerPrintData?.[selectedFinger]?.exceptionCaseRemarks ===
            "other" && (
            <InputWithLabel
              label={"Exception reason "}
              value={
                fingerPrintData
                  ? fingerPrintData?.[selectedFinger]?.exceptionCaseRemarks
                  : []
              }
              onChange={(e) => handleExceptionRemarksChange(e.target.value)}
              placeholder="Enter exception reason"
            />
          )} */}
          <ButtonReusable
            text="Next"
            loading={uploading}
            type="primary"
            style={{ marginTop: "10px", marginLeft: "82%" }}
            onClick={handleSubmit}
          />
        </StyledModal>
        <StyledModal
          visible={detailedView}
          onCancel={() => {
            setDetailData(null), setDetailedView(false);
          }}
          footer={null}
        >
          <FingerPrintDetail detailData={detailData} />
        </StyledModal>
      </div>
    </div>
  );
};

export default FingerLayout;
