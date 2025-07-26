import { Tooltip } from "antd";
import React from "react";

const styles = {
  marginRight: "12px",
};
const IconWrapper = ({ icon, alt, styles, onClick, title }) => {
  return (
    <Tooltip title={title} placement="left">
      <img src={icon} alt={alt} style={styles} onClick={onClick} />
    </Tooltip>
  );
};

export default IconWrapper;
