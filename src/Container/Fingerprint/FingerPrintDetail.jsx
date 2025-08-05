import { Table, Tabs } from "antd";
import React, { useState } from "react";
import { DataLabel, MetaData, Value } from "./style";
import ButtonReusable from "../../Components/Buttons/ButtonReusable";
import useGlobalContext from "../../contexts/Global/useGlobalContext";

const FingerPrintDetail = ({ detailData }) => {
  const [currentTab, setCurrentTab] = useState("1");
  const onChange = (key) => {
    setCurrentTab(key);
  };
  const {
    setFileModalVisible,
    setDetailedView,
    setModalOpen,
    templateType,
    setRemarksModalVisible,
    setImageFromServer,
    setBase64Image,
    setFingerType,
    setAddFingerModal,
    resetForm,
    setCurrentStep,
  } = useGlobalContext();

  const items = [
    {
      key: "1",
      label: "Original Image",
      children: (
        <div style={{ width: "200px", height: "200px", margin: "10px auto" }}>
          <img
            src={detailData?.original_image}
            height={"200px"}
            width={"200px"}
          />
        </div>
      ),
    },
    {
      key: "2",
      label: "Enhanced Image",
      children: (
        <div style={{ width: "200px", height: "200px", margin: "10px auto" }}>
          <img
            src={detailData?.enhanced_image}
            height={"200px"}
            width={"200px"}
          />
        </div>
      ),
    },
    {
      key: "3",
      label: "Minutiae Plotted Image",
      children: (
        <div style={{ width: "200px", height: "200px", margin: "10px auto" }}>
          <img
            src={detailData?.minutiae_plotted_image}
            height={"200px"}
            width={"200px"}
          />
        </div>
      ),
    },
  ];
  const handleSubmit = () => {
    if (templateType == "ten") {
      setDetailedView(false);
      setFileModalVisible(false);
      setRemarksModalVisible(false);
      setImageFromServer(null);
      setFingerType(null);
      // setCurrentStep(0);
    } else {
      setDetailedView(false);
      setFileModalVisible(false);
      setModalOpen(false);
      setBase64Image(false);
      setFingerType(null);
      setAddFingerModal(false);
      setCurrentStep(0);
      resetForm();
      window.location.reload();
    }
  };
  return (
    <>
      <Tabs defaultActiveKey={currentTab} items={items} onChange={onChange} />
      <MetaData>
        <>
          <DataLabel>
            Fingerprint Terminations :
            <Value>
              {detailData?.fingerprint_metadata?.fingerprint_terminations}
            </Value>
          </DataLabel>
        </>
        <>
          {" "}
          <DataLabel>
            Bifurcations Count :{" "}
            <div
              style={{
                backgroundColor: "#000096",
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                display: "inline-block",
              }}
            ></div>{" "}
            <Value>
              {detailData?.fingerprint_metadata?.bifurcations_count}
            </Value>
          </DataLabel>
        </>
        <>
          {" "}
          <DataLabel>
            Total Minutiae Points :{" "}
            <div
              style={{
                backgroundColor: "#009600",
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                display: "inline-block",
              }}
            ></div>{" "}
            <Value>
              {detailData?.fingerprint_metadata?.total_minutiae_points}
            </Value>
          </DataLabel>
        </>
        <>
          {" "}
          <DataLabel>
            Fingerprint Quality :
            <Value>{detailData?.fingerprint_metadata?.fingerprint_type}</Value>
          </DataLabel>
        </>
        <>
          {" "}
          <DataLabel>
            Finger Name :
            <Value>{detailData?.fingerprint_metadata?.finger_name}</Value>
          </DataLabel>
        </>
      </MetaData>
      <ButtonReusable
        type={"primary"}
        style={{ marginLeft: "80%" }}
        text={"Submit"}
        onClick={handleSubmit}
      />
    </>
  );
};

export default FingerPrintDetail;
