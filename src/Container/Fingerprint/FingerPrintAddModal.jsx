import React from "react";
import StyledModal from "../../Components/Modal/StyledModal";

import useGlobalContext from "../../contexts/Global/useGlobalContext";
import AddDemographicData from "./AddDemographicData";
import { Tabs } from "antd";
import FingerPrintAddFormModal from "./FingerPrintAddFormModal";

const FingerPrintAddModal = ({ onCancel }) => {
  const { modalOpen, currentTab, setCurrentTab } = useGlobalContext();
  const items = [
    {
      key: "1",
      label: "Demographic Data",
      children: <AddDemographicData />,
    },
    {
      key: "2",
      label: "Fingerprint",
      children: <FingerPrintAddFormModal />,
    },
  ];
  const handleTabChange = (key) => {
    setCurrentTab(key);
  };
  return (
    <StyledModal
      visible={modalOpen}
      onCancel={onCancel}
      title={"Add Template"}
      footer={null}
      width={"65%"}
      style={{ margin: "40px " }}
    >
      <Tabs
        items={items}
        defaultActiveKey="1"
        onChange={handleTabChange}
        activeKey={currentTab}
      />
    </StyledModal>
  );
};

export default FingerPrintAddModal;
