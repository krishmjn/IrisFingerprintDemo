import { useState } from "react";

export default function useGettersAndSetters() {
  const [fingerPrints, setFingerPrints] = useState();
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editModalOpen, setEditModaOpen] = useState(false);
  const [templateType, setTemplateType] = useState("ten");
  const [fromDetail, setFromDetail] = useState(false);
  const [currentTab, setCurrentTab] = useState("1");
  const [currentStep, setCurrentStep] = useState(0);
  const [imageFromServer, setImageFromServer] = useState(null);
  const [fingerType, setFingerType] = useState(null);
  const [base64Image, setBase64Image] = useState(null);
  const [enhancing, isEnhancing] = useState(false);
  const [reconstructing, isReconstructing] = useState(false);
  const [classifying, isClassifying] = useState(false);
  const [uploading, isUploading] = useState(false);
  const [uploadedFingers, setUploadedFingers] = useState([]);
  const [detailedView, setDetailedView] = useState(false);
  const [fileModalVisible, setFileModalVisible] = useState(false);
  const [remarksModalVisible, setRemarksModalVisible] = useState(false);
  const [addFingerModal, setAddFingerModal] = useState(false);
  const [searching, isSearching] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    id: "",
    gender: 1,
    dob: "",
  });

  const [fingerPrintData, setFingerPrintData] = useState(
    templateType === "ten"
      ? {}
      : {
          caseId: "",
          caseDescription: "",
          fingerName: [],
        }
  );

  return {
    fingerPrints,
    setFingerPrints,
    modalOpen,
    setModalOpen,
    deleteModalOpen,
    setDeleteModalOpen,
    editModalOpen,
    setEditModaOpen,
    templateType,
    setTemplateType,
    fromDetail,
    setFromDetail,
    currentTab,
    setCurrentTab,
    currentStep,
    setCurrentStep,
    formData,
    setFormData,
    fingerPrintData,
    setFingerPrintData,
    imageFromServer,
    setImageFromServer,
    fingerType,
    setFingerType,
    base64Image,
    setBase64Image,
    enhancing,
    isEnhancing,
    reconstructing,
    isReconstructing,
    classifying,
    isClassifying,
    uploading,
    isUploading,
    uploadedFingers,
    setUploadedFingers,
    setDetailedView,
    detailedView,
    fileModalVisible,
    setFileModalVisible,
    remarksModalVisible,
    setRemarksModalVisible,
    addFingerModal,
    setAddFingerModal,
    searching,
    isSearching,

    // individual setters for form fields
    setName: (name) => setFormData((prev) => ({ ...prev, name })),
    setId: (id) => setFormData((prev) => ({ ...prev, id })),
    setGender: (gender) => setFormData((prev) => ({ ...prev, gender })),
    setDob: (dob) => setFormData((prev) => ({ ...prev, dob })),

    // fingerprint-specific setters
    setCaseId: (caseId) => setFingerPrintData((prev) => ({ ...prev, caseId })),
    setCaseDescription: (caseDescription) =>
      setFingerPrintData((prev) => ({ ...prev, caseDescription })),
    setFingerName: (fingerName) =>
      setFingerPrintData((prev) => ({ ...prev, fingerName })),
    setFiles: (fingerName, filePath) =>
      setFingerPrintData((prev) => ({
        ...prev,
        [fingerName]: {
          ...prev[fingerName],
          filePath,
        },
      })),
    setExceptionCaseRemarks: (fingerName, exceptionCaseRemarks) =>
      setFingerPrintData((prev) => ({
        ...prev,
        [fingerName]: {
          ...prev[fingerName],
          exceptionCaseRemarks,
        },
      })),

    // reset handler
    resetForm: () => {
      setFormData({ name: "", id: "", gender: 1, dob: "" });
      setFingerPrintData(
        templateType === "ten"
          ? {}
          : {
              caseId: "",
              caseDescription: "",
              fingerName: [],
            }
      );
    },
  };
}
