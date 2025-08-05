import React from "react";
import StyledModal from "../../../Components/Modal/StyledModal";
import { Steps, Button } from "antd";
import FingerPrintAddFormModal from "../CreateForm/FingerPrintAddFormModal";
import FaceInterface from "../../Face/FaceInterface";
import AddDemographicData from "../CreateForm/AddDemographicData";
import "../Hand.css";
import { StyledSteps } from "../style";
import useGlobalContext from "../../../contexts/Global/useGlobalContext";
import CaseInput from "./CaseInput";

const FingerPrintAddModal = ({ onCancel }) => {
  const {
    modalOpen,

    templateType,

    setModalOpen,
    currentStep,
    setCurrentStep,
  } = useGlobalContext();

  const next = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const prev = () => {
    setCurrentStep((prev) => prev - 1);
  };
  const handleSubmit = async () => {
    setCurrentStep(0);
    setModalOpen(false);
    window.location.reload();
  };

  const steps = [
    ...(templateType === "ten"
      ? [{ title: "Demographic", content: <AddDemographicData /> }]
      : [{ title: "Case Details", content: <CaseInput /> }]),

    { title: "Fingerprint", content: <FingerPrintAddFormModal /> },
    ...(templateType === "ten"
      ? [{ title: "Face", content: <FaceInterface /> }]
      : []),
  ];
  return (
    <StyledModal
      visible={modalOpen}
      onCancel={onCancel}
      footer={null}
      width={"65%"}
      style={{ margin: "40px" }}
    >
      <StyledSteps
        current={currentStep}
        items={steps.map(({ title }) => ({ title }))}
      />

      <div style={{ marginTop: 24 }}>{steps[currentStep].content}</div>

      <div style={{ marginTop: 24, textAlign: "right" }}>
        {currentStep > 0 && (
          <Button style={{ margin: "0 8px" }} onClick={prev}>
            Previous
          </Button>
        )}
        {currentStep < steps.length - 1 && (
          <Button
            type="primary"
            onClick={next}
            // disabled={currentStep === 1 && !ifFirstStepValid}
          >
            Next
          </Button>
        )}
        {currentStep === steps.length - 1 && (
          <Button type="primary" onClick={handleSubmit}>
            Finish
          </Button>
        )}
      </div>
    </StyledModal>
  );
};

export default FingerPrintAddModal;
