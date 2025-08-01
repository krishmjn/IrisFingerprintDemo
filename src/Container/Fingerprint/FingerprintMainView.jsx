import { Table } from "antd";
import React, { useEffect, useState } from "react";
import { FingerprintWrapper } from "./style";
import ButtonReusable from "../../Components/Buttons/ButtonReusable";
import FingerPrintAddModal from "./FingerPrintAddModal";
import useGlobalContext from "../../contexts/Global/useGlobalContext";
import { fetchFingerPrint } from "../../hooks/api/FingerPrint/FetchFingerPrint/FetchFingerPrint";
import { deleteFingerPrint } from "../../hooks/api/FingerPrint/DeleteFingerPrint/DeleteFingerPrint";
import StyledModal from "../../Components/Modal/StyledModal";
import { FingerPrint } from "../../DataModels/FingerPrintDataModels";
import dayjs from "dayjs";
import AddDemographicData from "./AddDemographicData";
import FingerPrintAddFormModal from "./FingerPrintAddFormModal";

const FingerprintMainView = () => {
  const [selectedId, setSelectedId] = useState(null);
  const {
    fingerPrints,
    setFingerPrints,
    modalOpen,
    setModalOpen,
    fromDetail,
    setId,
    setName,
    setGender,
    setDob,
    resetForm,
    deleteModalOpen,
    setDeleteModalOpen,
    editModalOpen,
    setEditModaOpen,
    setFromDetail,
    setFingerName,
    setExceptionRemarks,
    setCurrentTab,
  } = useGlobalContext();

  const columns = [
    { title: "I.D", dataIndex: "id", key: "id", width: "10%" },
    { title: "Name", dataIndex: "name", key: "name", width: "30%" },
    { title: "Gender", dataIndex: "gender", key: "gender", width: "20%" },
    {
      title: "D.O.B",
      dataIndex: "dob",
      key: "dob",
      width: "20%",
      render: (_, data) => {
        // return isDayjs(data.dob) ? data.dob.format("YYYY-MM-DD") : data.dob;
        const dob = dayjs(data.dob); // Convert string or date to dayjs
        return dob.isValid() ? dob.format("YYYY-MM-DD") : "Invalid Date";
      },
    },
    {
      title: "Action",
      key: "action",
      width: "20%",
      render: (_text, record) => (
        <div style={{ display: "flex", gap: "10px" }}>
          <ButtonReusable
            type="primary"
            text="Edit"
            onClick={(e) => (
              setFromDetail(false),
              e.stopPropagation(),
              handleEditBtnClick(record?.id)
            )}
          />
          <ButtonReusable
            type="danger"
            text="Delete"
            onClick={(e) => (
              e.stopPropagation(), handleDeleteBtnClick(record?.id)
            )}
          />
        </div>
      ),
    },
  ];

  const handleDeleteBtnClick = (id) => {
    setSelectedId(id);
    setDeleteModalOpen(true);
  };
  const handleEditBtnClick = (id) => {
    const fingerPrint = fingerPrints.find((item) => item.id === id);
    if (fingerPrint) {
      const { id, name, gender, dob, fingerName, exceptionCaseRemarks } =
        fingerPrint;
      setId(id);
      setName(name);
      setGender(gender);
      setDob(dob);
      setEditModaOpen(true);
      setFingerName(fingerName);
      setExceptionRemarks(exceptionCaseRemarks);
    }
  };
  const handleRowClick = (id) => {
    // setFromDetail(true);

    const fingerPrint = fingerPrints.find((item) => item.id === id);
    if (fingerPrint) {
      const { id, name, gender, dob, fingerName, exceptionCaseRemarks } =
        fingerPrint;
      setId(id);
      setName(name);
      setGender(gender);
      setDob(dob);
      setFingerName(fingerName);
      setExceptionRemarks(exceptionCaseRemarks);
    }
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
    setCurrentTab("1");
    resetForm();
  };

  const handleSubmit = () => {
    setFromDetail(false);
  };
  return (
    <FingerprintWrapper>
      <ButtonReusable
        text={"+ Add Template"}
        onClick={handleBtnClick}
        type={"primary"}
        style={{ position: "absolute", right: "20px" }}
      />
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
        title={"Add FingerPrint"}
        okText={"Add"}
        visible={fromDetail}
        onCancel={() => setFromDetail(false)}
        onOk={() => handleSubmit()}
        style={{ padding: "20px" }}
        children={<FingerPrintAddFormModal />}
      />
    </FingerprintWrapper>
  );
};

export default FingerprintMainView;
