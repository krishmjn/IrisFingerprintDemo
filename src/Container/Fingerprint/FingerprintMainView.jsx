import { Dropdown, Table } from "antd";
import React, { useEffect, useState } from "react";
import { FingerprintWrapper } from "./style";
import ButtonReusable from "../../Components/Buttons/ButtonReusable";
import FingerPrintAddModal from "./CreateForm/FingerPrintAddModal";
import useGlobalContext from "../../contexts/Global/useGlobalContext";
import { fetchFingerPrint } from "../../hooks/api/FingerPrint/FetchFingerPrint/FetchFingerPrint";
import { deleteFingerPrint } from "../../hooks/api/FingerPrint/DeleteFingerPrint/DeleteFingerPrint";
import StyledModal from "../../Components/Modal/StyledModal";
import { FingerPrint } from "../../DataModels/FingerPrintDataModels";
import AddDemographicData from "./CreateForm/AddDemographicData";
import FingerPrintDetailVIew from "./FingerPrintDetailVIew";

const FingerprintMainView = () => {
  const [selectedFingerPrint, setSelectedFingerPrint] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const {
    fingerPrints,
    setFingerPrints,
    modalOpen,
    setModalOpen,
    setId,
    setName,
    setGender,
    setDob,
    resetForm,
    fromDetail,
    deleteModalOpen,
    setDeleteModalOpen,
    editModalOpen,
    setEditModaOpen,
    setTemplateType,
    setFromDetail,
    setCurrentStep,
  } = useGlobalContext();

  const columns = [
    { title: "I.D", dataIndex: "id", key: "id", width: "10%" },
    { title: "Name", dataIndex: "name", key: "name", width: "30%" },
    { title: "Gender", dataIndex: "gender", key: "gender", width: "20%" },
    {
      title: "Enroll Type",
      dataIndex: "enrollType",
      key: "enrollType",
      width: "20%",
    },
    {
      title: "D.O.B",
      dataIndex: "dob",
      key: "dob",
      width: "20%",
      // render: (_, data) => {
      //   // return isDayjs(data.dob) ? data.dob.format("YYYY-MM-DD") : data.dob;
      //   const dob = dayjs(data.dob); // Convert string or date to dayjs
      //   return dob.isValid() ? dob.format("YYYY-MM-DD") : "Invalid Date";
      // },
    },
  ];

  const handleRowClick = (id) => {
    setFromDetail(true);

    const fingerPrint = fingerPrints.find((item) => item.id === id);
    console.log(fingerPrint, 999);
    setSelectedFingerPrint(fingerPrint);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteFingerPrint(selectedId);

      setFingerPrints((prev) => prev.filter((item) => item.id !== selectedId));

      setDeleteModalOpen(false);
      setSelectedId(null);
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const onDeleteModalCancel = () => {
    setDeleteModalOpen(false);
    setSelectedId(null);
  };

  useEffect(() => {
    async function loadData() {
      const data = await fetchFingerPrint();
      setFingerPrints(FingerPrint.mapData(data));
    }

    loadData();
  }, [setFingerPrints]);

  const handleBtnClick = () => {
    setModalOpen(true);
    resetForm();
  };

  const onModalCancel = () => {
    setModalOpen(false);
    setCurrentStep(0);
    resetForm();
  };

  const dpdownOptions = [
    {
      label: <a>Ten Print</a>,
      key: "ten",
    },
    {
      label: <a>Chance fingerPrintData</a>,
      key: "chance",
    },
  ];
  return (
    <FingerprintWrapper>
      <div style={{ position: "absolute", right: "20px" }}>
        <Dropdown
          trigger={["hover"]}
          menu={{
            items: dpdownOptions,
            onClick: ({ key }) => {
              setTemplateType(key);
              handleBtnClick();
            },
          }}
          position={"bottomRight"}
        >
          <span>
            <ButtonReusable text={"+  Add Template"} type={"primary"} />
          </span>
        </Dropdown>
      </div>

      <Table
        columns={columns}
        style={{ marginTop: "40px", cursor: "pointer" }}
        dataSource={fingerPrints}
        rowKey="id"
        onRow={(record) => ({
          onClick: () => {
            handleRowClick(record.id);
          },
        })}
      />
      <FingerPrintAddModal onCancel={onModalCancel} visible={modalOpen} />

      <StyledModal
        visible={deleteModalOpen}
        onCancel={onDeleteModalCancel}
        onOk={handleConfirmDelete}
        style={{ padding: "20px" }}
      >
        Are you sure you want to delete?
      </StyledModal>
      <StyledModal
        title={"Edit Template"}
        visible={editModalOpen}
        onCancel={() => (setEditModaOpen(false), setFromDetail(false))}
        style={{ padding: "20px" }}
        footer={null}
        children={<AddDemographicData fromEdit={true} />}
      />
      <StyledModal
        title={"Template Details"}
        onCancel={() => setFromDetail(false)}
        visible={fromDetail}
        footer={null}
        children={<FingerPrintDetailVIew data={selectedFingerPrint} />}
      />
    </FingerprintWrapper>
  );
};

export default FingerprintMainView;
