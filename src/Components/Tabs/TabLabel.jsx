import React from "react";
import { TabWrapper } from "./styles";

const TabLabel = ({ number, label, completed, onClick }) => {
  return (
    <TabWrapper onClick={onClick}>
      <div className="number-outer">
        <div className={`number ${completed && "completed"}`}>{number}</div>
      </div>
      <div className="label">{label}</div>
    </TabWrapper>
  );
};

export default TabLabel;
