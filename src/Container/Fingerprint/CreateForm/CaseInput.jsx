import React from "react";
import InputWithLabel from "../../../Components/InputWithLabel/InputWithLabel";
import useGlobalContext from "../../../contexts/Global/useGlobalContext";

const CaseInput = () => {
  const { caseId, setCaseId, caseDescription, setCaseDescription } =
    useGlobalContext();
  const handleChange = (value, field) => {
    if (field === "caseDescription") {
      setCaseDescription(value);
    }

    if (field === "caseId") {
      setCaseId(value);
    }
  };
  return (
    <div>
      <InputWithLabel
        label="Case I.D"
        value={caseId}
        onChange={(e) => handleChange(e.target.value, "caseId")}
        required={true}
      />
      <InputWithLabel
        label="Case Description"
        onChange={(e) => handleChange(e.target.value, "caseDescription")}
        value={caseDescription}
        textarea={true}
        required={true}
      />
    </div>
  );
};

export default CaseInput;
