import React, { useState } from "react";
import SelectWithLabel from "../../../Components/SelectWithLabel/SelectWithLabel";
import useGlobalContext from "../../../contexts/Global/useGlobalContext";
import { fingers, fingerTypeOptions } from "../helper";
import FileUpload from "../../../Components/FileUpload/FileUpload";
import ButtonReusable from "../../../Components/Buttons/ButtonReusable";
import FingerLayout from "../FingerLayout";
import { Button, Checkbox, Spin } from "antd";
import StyledModal from "../../../Components/Modal/StyledModal";
import { enhanceImage } from "../../../hooks/api/FingerPrint/ImageEnhancement/EnhanceImage";
import { classifyFingerType } from "../../../hooks/api/FingerPrint/ImageEnhancement/ClassifyFingerType";
import { addFingerPrint } from "../../../hooks/api/FingerPrint/AddFingerPrint/AddFingerPrint";
import { reconstructImage } from "../../../hooks/api/FingerPrint/ImageEnhancement/Reconstruct";
import FingerPrintDetail from "../FingerPrintDetail";

const FingerPrintAddFormModal = () => {
  const {
    templateType,
    fingerName,
    setFingerName,
    setCaseDescription,
    setCaseId,
    setFingerType,
    fingerType,
    base64Image,
    fingerPrintData,
    setBase64Image,
    enhancing,
    isEnhancing,
    isReconstructing,
    isClassifying,
    reconstructing,
    classifying,
    uploading,
    isUploading,
    setDetailedView,
    detailedView,
    uploadedFingers,
    setUploadedFingers,
    addFingerModal,
    setAddFingerModal,
  } = useGlobalContext();

  const [detailData, setDetailData] = useState(null);

  const handleChange = (value, field) => {
    if (field === "caseDescription") {
      setCaseDescription(value);
    }
    if (field === "caseId") {
      setCaseId(value);
    }
    if (field === "fingerName") {
      setFingerName(value);
    }
  };

  const handleAddFingerPrintClick = () => {
    setAddFingerModal(true);
  };

  const handleEnhancement = async () => {
    isEnhancing(true);
    const res = await enhanceImage(base64Image);
    isEnhancing(false);
    setBase64Image(res?.enhanced_image_data);
  };

  const handleReconstruction = async () => {
    isReconstructing(true);
    const res = await reconstructImage(base64Image);
    setBase64Image(res?.reconstructed_image_data);
    isReconstructing(false);
  };
  const handleClassifyFingerType = async () => {
    isClassifying(true);
    const res = await classifyFingerType(base64Image);
    setFingerType(res?.fingerprint_type);
    isClassifying(false);
  };

  const handleSubmit = async () => {
    isUploading(true);
    const data = {
      image_data: base64Image,
      finger_name: fingerPrintData?.fingerName,
      fingerprint_type: fingerType,
      case_id: fingerPrintData?.caseId,
      case_description: fingerPrintData?.caseDescription,
      exception_case_remarks: fingerPrintData?.exceptionCaseRemarks,
      enroll_type: templateType === "ten" ? "Live enroll" : "chance print",
    };

    const res = await addFingerPrint(data);
    setDetailedView(true);
    isUploading(false);
    setDetailData(res);

    // setAddFingerModal(false);
  };

  return (
    <div>
      {templateType === "ten" ? (
        <>
          <div>
            <label>
              Upload finger prints: <span className="required">*</span>
            </label>
            <br />
          </div>
          <FingerLayout />
        </>
      ) : (
        <>
          <ButtonReusable
            text={"+ Add Fingerprint"}
            type={"primary"}
            onClick={handleAddFingerPrintClick}
          />
          <StyledModal
            visible={addFingerModal}
            onCancel={() => setAddFingerModal(false)}
            footer={null}
            style={{ position: "relative" }}
          >
            {base64Image == null ? (
              <>
                <SelectWithLabel
                  label="Finger"
                  onChange={(value) => handleChange(value, "fingerName")}
                  value={fingerName}
                  options={fingers}
                />

                <div>
                  <label>Upload finger prints: </label>
                  <br />
                  <FileUpload
                    multiple={true}
                    style={{ marginTop: "10px" }}
                    allowedFileTypes={["image/png", "image/jpeg", "image/jpg"]}
                    onChange={(e) => setBase64Image(e)}
                  />
                </div>
              </>
            ) : (
              <div
              // style={{
              //   alignItems: "center",
              //   display: "flex",
              //   flexDirection: "column",
              // }}
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
                  {enhancing || reconstructing ? (
                    <Spin
                      tip="Enhancing"
                      size="small"
                      style={{ marginTop: "50%" }}
                    >
                      {/* Enhancing... */}
                    </Spin>
                  ) : (
                    <img src={base64Image} width={"100%"} height={"100%"} />
                  )}
                </div>
                <div
                  style={{
                    marginTop: "10px",
                    display: "flex",
                    gap: "10px",
                  }}
                >
                  <ButtonReusable
                    text={"Enhancement"}
                    type={"primary"}
                    onClick={handleEnhancement}
                  />
                  <ButtonReusable
                    text={"Reconstruction"}
                    type={"primary"}
                    onClick={handleReconstruction}
                  />
                </div>
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
                    loading={classifying}
                    type={"primary"}
                    style={{ marginBottom: "8px", marginLeft: "10px" }}
                    onClick={handleClassifyFingerType}
                  />
                </div>
                <ButtonReusable
                  text={"Next"}
                  loading={uploading}
                  type={"primary"}
                  style={{
                    marginLeft: "85%",
                  }}
                  onClick={handleSubmit}
                />
              </div>
            )}
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
        </>
      )}
    </div>
  );
};

export default FingerPrintAddFormModal;
