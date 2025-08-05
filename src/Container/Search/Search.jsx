import React, { Children, useState } from "react";
import { AiOutlinePicture } from "react-icons/ai";
import { SearchWrapper } from "./styles";
import FileUpload from "../../Components/FileUpload/FileUpload";
import { enhanceImage } from "../../hooks/api/FingerPrint/ImageEnhancement/EnhanceImage";
import useGlobalContext from "../../contexts/Global/useGlobalContext";
import { reconstructImage } from "../../hooks/api/FingerPrint/ImageEnhancement/Reconstruct";
import ButtonReusable from "../../Components/Buttons/ButtonReusable";
import { Spin, Table, Tabs } from "antd";
import SelectWithLabel from "../../Components/SelectWithLabel/SelectWithLabel";
import { fingerNameConverter, fingerTypeOptions } from "../Fingerprint/helper";
import { classifyFingerType } from "../../hooks/api/FingerPrint/ImageEnhancement/ClassifyFingerType";
import { searchFingerprint } from "../../hooks/api/FingerPrint/SearchFinger/Search";
import { SearchDataModel } from "../../DataModels/SearchDataModel";
import { DataLabel, Value } from "../Fingerprint/style";
import StyledModal from "../../Components/Modal/StyledModal";

const Search = () => {
  const {
    isEnhancing,
    isReconstructing,
    enhancing,
    reconstructing,
    fingerType,
    setFingerType,
    classifying,
    isClassifying,
    searching,
    isSearching,
  } = useGlobalContext();

  const [searchImage, setSearchImage] = useState(null);
  const [searchData, setSearchData] = useState(null);
  const [tableRowModal, setTableRowModal] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState(null);

  const items = [
    {
      label: "Original Image",
      key: "Original Image",
      children: (
        <div style={{ width: "200px", height: "200px", margin: "5px auto" }}>
          <img
            src={searchData?.original_image}
            alt="Enhanced"
            height={"200px"}
            width={"200px"}
          />
        </div>
      ),
    },
    {
      label: "Enhanced Image",
      key: "Enhanced Image",
      children: (
        <div style={{ width: "200px", height: "200px", margin: "5px auto" }}>
          <img
            src={searchData?.enhancedImage}
            alt="Enhanced"
            height={"200px"}
            width={"200px"}
          />
        </div>
      ),
    },
    {
      label: "Minutiae Image",
      key: "Minutiae Image",
      children: (
        <div style={{ width: "200px", height: "200px", margin: "5px auto" }}>
          <img
            src={searchData?.minutiae_plotted_image}
            alt="Enhanced"
            height={"200px"}
            width={"200px"}
          />
        </div>
      ),
    },
  ];

  const handleEnhancement = async () => {
    isEnhancing(true);
    const res = await enhanceImage(searchImage);
    isEnhancing(false);
    setSearchImage(res?.enhanced_image_data);
  };

  const handleReconstruction = async () => {
    isReconstructing(true);
    const res = await reconstructImage(searchImage);
    setSearchImage(res?.reconstructed_image_data);
    isReconstructing(false);
  };

  const handleClassifyFingerType = async () => {
    isClassifying(true);
    const res = await classifyFingerType(searchImage);
    setFingerType(res?.fingerprint_type);
    isClassifying(false);
  };

  const handleSearch = async () => {
    isSearching(true);
    const res = await searchFingerprint({
      image_data: searchImage,
      fingerprint_type: fingerType,
    });
    const mappedData = SearchDataModel.mapData(res);
    setSearchData(mappedData);
    isSearching(false);
  };

  const columns = [
    {
      title: "I.D",
      key: "id",
      width: "10%",
      render: (text, record) => record.case_id || record.template_id || "N/A",
    },
    {
      title: " Name",
      dataIndex: "finger_name",
      key: "finger",
      width: "30%",
      render: (text, record) => record.name || "-",
    },
    {
      title: "Finger Name",
      dataIndex: "finger_name",
      key: "finger",
      width: "30%",
      render: (_data) => fingerNameConverter(_data),
    },

    {
      title: "similarity score",
      dataIndex: "score",
      key: "similarity score",
      width: "20%",
    },
  ];

  const handleRowClick = (data) => {
    setTableRowModal(true);
    setSelectedRowData(data);
  };

  return searchData === null ? (
    <SearchWrapper>
      {searchImage == null ? (
        <>
          <AiOutlinePicture
            size={100}
            style={{ marginTop: "20%", fontWeight: "bold" }}
          />
          <span className="uploadSpan">
            <FileUpload onChange={(e) => setSearchImage(e)} />
            <b>Upload</b> file to search
          </span>
        </>
      ) : (
        <>
          <div
            style={{
              margin: "10% auto 10px",
              width: "180px",
              height: "200px",
              border: "1px solid #ccc",
              textAlign: "center",
              alignItems: "center",
            }}
          >
            {enhancing || reconstructing ? (
              <Spin tip="Enhancing" size="small" style={{ marginTop: "50%" }} />
            ) : (
              <div style={{ width: "180px", height: "200px" }}>
                <img src={searchImage} width={"180px"} height={"200px"} />
              </div>
            )}
          </div>

          <div
            style={{
              margin: "1px 35%",
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
              margin: "10px 35%",
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
        </>
      )}

      <ButtonReusable
        text={"Search"}
        loading={searching}
        type={"primary"}
        style={{
          marginBottom: "8px",
          marginLeft: "10px",
          position: "absolute",
          bottom: "20px",
          right: "20px",
        }}
        onClick={handleSearch}
      />
    </SearchWrapper>
  ) : (
    <>
      <div
        style={{
          padding: "20px",
          width: "30%",
          margin: "5% ",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        {console.log(searchData?.matches, 999)}
        <Tabs items={items} />
        <div style={{ marginTop: "20px" }}>
          <DataLabel>
            Fingerprint Type:
            <Value> {searchData?.fingerprint_metadata?.fingerprint_type}</Value>
          </DataLabel>

          <DataLabel>
            Fingerprint Terminations Count:{" "}
            <Value>
              {searchData?.fingerprint_metadata?.fingerprint_terminations}
            </Value>
          </DataLabel>
          <DataLabel>
            Fingerprint Bifurcations Count:{" "}
            <div
              style={{
                backgroundColor: "#009600",
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                display: "inline-block",
              }}
            ></div>
            <Value>
              {" "}
              {searchData?.fingerprint_metadata?.bifurcations_count}
            </Value>
          </DataLabel>
          <DataLabel>
            {" "}
            Total Minutiae Points:{" "}
            <div
              style={{
                backgroundColor: "#000096",
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                display: "inline-block",
              }}
            ></div>
            <Value>
              {" "}
              {searchData?.fingerprint_metadata?.total_minutiae_points}
            </Value>
          </DataLabel>
        </div>
      </div>
      <div
        style={{
          padding: "20px",
          margin: "5%",
        }}
      >
        <h2>Search Results : {searchData?.matches?.length}</h2>
        <Table
          columns={columns}
          dataSource={searchData?.matches}
          onRow={(record) => ({
            onClick: () => {
              handleRowClick(record);
            },
          })}
        />
        <StyledModal
          visible={tableRowModal}
          onCancel={() => setTableRowModal(false)}
          footer={null}
        >
          <Tabs items={items} />
          <div style={{ marginTop: "20px" }}>
            <DataLabel>
              Fingerprint Type:
              <Value> {selectedRowData?.fingerprint_type}</Value>
            </DataLabel>

            <DataLabel>
              Fingerprint Terminations Count:{" "}
              <Value>{selectedRowData?.fingerprint_terminations}</Value>
            </DataLabel>
            <DataLabel>
              Fingerprint Bifurcations Count:{" "}
              <div
                style={{
                  backgroundColor: "#009600",
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  display: "inline-block",
                }}
              ></div>
              <Value> {selectedRowData?.bifurcations_count}</Value>
            </DataLabel>
            <DataLabel>
              {" "}
              Total Minutiae Points:{" "}
              <div
                style={{
                  backgroundColor: "#000096",
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  display: "inline-block",
                }}
              ></div>
              <Value> {selectedRowData?.total_minutiae_points}</Value>
            </DataLabel>
          </div>
        </StyledModal>
      </div>
    </>
  );
};

export default Search;
