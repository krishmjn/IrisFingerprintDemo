import React from "react";
import SelectWithLabel from "../../Components/SelectWithLabel/SelectWithLabel";
import useGlobalContext from "../../contexts/Global/useGlobalContext";
import { fingers, options } from "./helper";
import InputWithLabel from "../../Components/InputWithLabel/InputWithLabel";
import FileUpload from "../../Components/FileUpload/FileUpload";
import ButtonReusable from "../../Components/Buttons/ButtonReusable";
import { addFingerPrint } from "../../hooks/api/FingerPrint/AddFingerPrint/AddFingerPrint";
import Hand from "./FingerLayout";

const FingerPrintAddFormModal = () => {
  const {
    templateType,
    caseId,
    setTemplateType,
    fingerName,
    formData,
    exceptionCaseRemarks,
    caseDescription,
    setCaseDescription,
    setFingerName,
    setCaseId,
    setExceptionRemarks,
    setFilePath,
    setFingerPrints,
    resetForm,
    setModalOpen,
    setCurrentTab,
  } = useGlobalContext();

  const handleChange = (value, field) => {
    if (field === "caseDescription") {
      setCaseDescription(value);
    }
    if (field === "fingerName") {
      setFingerName(value);
    }
    if (field === "exceptionCaseRemarks") {
      setExceptionRemarks(value);
    }
    if (field === "caseId") {
      setCaseId(value);
    }
  };
  const handleSubmit = async () => {
    // if (fromEdit) {
    //   const updatedRecord = await updateFingerPrint(id, {
    //     ...formData,

    //     templateType,
    //   });
    //   setFingerPrints((prev) =>
    //     prev.map((item) =>
    //       item.id === updatedRecord.id ? updatedRecord : item
    //     )
    //   );
    //   setEditModaOpen(false);

    //   resetForm();
    // } else {
    const newRecord = await addFingerPrint({
      ...formData,
      templateType,
    });
    setFingerPrints((prev) => [...prev, newRecord?.data]);
    resetForm();
    setModalOpen(false);
    // }
  };

  return (
    <div>
      <SelectWithLabel
        label="Finger print type"
        onChange={(value) => setTemplateType(value)}
        value={templateType}
        options={options}
      />
      {templateType === "ten" ? (
        <>
          <div>
            <label>Upload finger prints: </label>
            <br />
          </div>
          <Hand />
        </>
      ) : (
        <>
          <InputWithLabel
            label="Case I.D"
            value={caseId}
            onChange={(e) => handleChange(e.target.value, "caseId")}
          />
          <InputWithLabel
            label="Case Description"
            onChange={(e) => handleChange(e.target.value, "caseDescription")}
            value={caseDescription}
            textarea={true}
          />
          <SelectWithLabel
            label="Finger Name"
            onChange={(value) => handleChange(value, "fingerName")}
            value={fingerName}
            options={fingers}
            mode="multiple"
          />
          <div>
            <label>Upload finger prints: </label>
            <br />
            <FileUpload multiple={true} style={{ marginTop: "10px" }} />
          </div>
        </>
      )}
      <div style={{ display: "flex", marginLeft: "80%" }}>
        <ButtonReusable
          // type="primary"
          onClick={() => setCurrentTab("1")}
          // disabled={true}
          style={{ marginTop: "20px", marginRight: "15px" }}
          text={"Back"}
        />
        <ButtonReusable
          type="primary"
          onClick={handleSubmit}
          // disabled={true}
          style={{ marginTop: "20px" }}
          text={"Submit"}
        />
      </div>
    </div>
  );
};

export default FingerPrintAddFormModal;
