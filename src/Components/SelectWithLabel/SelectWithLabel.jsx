import { Input, Select } from "antd";
import React from "react";

const SelectWithLabel = ({
  label,
  value,
  onChange,
  mode,
  options,
  disabled,
}) => {
  return (
    <div style={{ marginBottom: "16px" }}>
      <span style={{ display: "block", marginBottom: "8px" }}>{label} :</span>
      <Select
        disabled={disabled}
        style={{ width: "100%" }}
        mode={mode}
        value={value}
        onChange={onChange}
        options={options}
      />
    </div>
  );
};

export default SelectWithLabel;
