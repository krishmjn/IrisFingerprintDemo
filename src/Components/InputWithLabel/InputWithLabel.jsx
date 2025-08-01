import { Input } from "antd";
import React from "react";

const InputWithLabel = ({
  label,
  value,
  onChange,
  disabled = false,
  textarea = false,
}) => {
  return (
    <div style={{ marginBottom: "16px" }}>
      <span style={{ display: "block", marginBottom: "8px" }}>{label} :</span>
      {textarea ? (
        <Input.TextArea value={value} onChange={onChange} disabled={disabled} />
      ) : (
        <Input value={value} onChange={onChange} disabled={disabled} />
      )}
    </div>
  );
};

export default InputWithLabel;
