import { Button } from "antd";
import React from "react";

const ButtonReusable = ({ text, type, disabled, onClick, style, loading }) => {
  return (
    <div>
      <Button
        type={type}
        danger={type === "danger"}
        disabled={disabled}
        onClick={onClick}
        style={style}
        loading={loading}
      >
        {text}
      </Button>
    </div>
  );
};

export default ButtonReusable;
