import { Input, Select } from "antd";
import React from "react";

const SelectWithLabel = ({
  label,
  value,
  onChange,
  mode,
  options,
  disabled,
  placeholder,
  width,
  required = false,
}) => {
  return (
    <div style={{ marginBottom: "16px" }}>
      <span style={{ display: "block", marginBottom: "8px" }}>
        {label}
        {label ? ":" : ""} {required && <span className="required">*</span>}
      </span>
      <Select
        placeholder={placeholder}
        disabled={disabled}
        style={{ width: width ? width : "100%" }}
        mode={mode}
        value={value}
        onChange={onChange}
        options={options}
      />
    </div>
  );
};

export default SelectWithLabel;
