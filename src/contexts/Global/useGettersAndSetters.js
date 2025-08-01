import { useState } from "react";

export default function useGettersAndSetters() {
  const [fingerPrints, setFingerPrints] = useState();
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editModalOpen, setEditModaOpen] = useState(false);
  const [templateType, setTemplateType] = useState("ten");
  const [fromDetail, setFromDetail] = useState(false);
  const [currentTab, setCurrentTab] = useState("1");
  const [formData, setFormData] = useState({
    name: "",
    id: "",
    gender: 1,
    dob: "",
    ...(templateType === "ten"
      ? {
          fingerName: [],
          exceptionCaseRemarks: "",
          filePath: "",
        }
      : {
          caseId: "",
          caseDescription: "",
          fingerName: [],
          filePath: "",
        }),
  });

  return {
    fingerPrints,
    setFingerPrints,
    modalOpen,
    setModalOpen,
    formData,
    setFormData,
    deleteModalOpen,
    setDeleteModalOpen,
    editModalOpen,
    setEditModaOpen,
    templateType,
    fromDetail,

    currentTab,
    setCurrentTab,
    setFromDetail,
    setTemplateType,
    setName: (name) => setFormData((prev) => ({ ...prev, name })),
    setId: (id) => setFormData((prev) => ({ ...prev, id })),
    setGender: (gender) => setFormData((prev) => ({ ...prev, gender })),
    setDob: (dob) => setFormData((prev) => ({ ...prev, dob })),
    setCaseId: (caseId) => setFormData((prev) => ({ ...prev, caseId })),
    setCaseDescription: (caseDescription) =>
      setFormData((prev) => ({ ...prev, caseDescription })),
    setFingerName: (fingerName) =>
      setFormData((prev) => ({ ...prev, fingerName })),
    setExceptionRemarks: (exceptionCaseRemarks) =>
      setFormData((prev) => ({ ...prev, exceptionCaseRemarks })),
    setFilePath: (filePath) => setFormData((prev) => ({ ...prev, filePath })),
    resetForm: () => setFormData({ name: "", id: "", gender: 1, dob: "" }),
  };
}
