import { Button } from "antd";
import React from "react";

const ButtonReusable = ({ text, type, disabled, onClick, style }) => {
  return (
    <div>
      <Button
        type={type}
        danger={type === "danger"}
        disabled={disabled}
        onClick={onClick}
        style={style}
      >
        {text}
      </Button>
    </div>
  );
};

export default ButtonReusable;
