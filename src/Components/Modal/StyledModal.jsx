import { Modal } from "antd";
import React from "react";

const StyledModal = ({
  visible,
  onCancel,
  onOk,
  style,
  title,
  children,
  okText,
  footer,
  width,
}) => {
  return (
    <Modal
      visible={visible}
      footer={footer}
      onCancel={onCancel}
      onOk={onOk}
      okText={okText}
      style={style}
      title={title}
      centered={true}
      width={width}
    >
      {children}
    </Modal>
  );
};

export default StyledModal;
