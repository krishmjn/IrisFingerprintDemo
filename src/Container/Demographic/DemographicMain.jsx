import { Tabs } from "antd";
import React, { useState } from "react";
import Demographic from "./Demographic";
import Search from "../Search/Search";
import { Demograhics } from "./styles";

const DemographicMain = () => {
  const [currentTab, setCurrentTab] = useState("1");
  const handleChangeCurrentTab = (key) => {
    setCurrentTab(key);
  };
  const items = [
    {
      label: "Demographic",
      key: "1",
      children: <Demographic setCurrentTab={handleChangeCurrentTab} />,
    },
    {
      label: "FingerPrint",
      key: "2",
      children: <Search />,
    },
  ];
  return (
    <Demograhics>
      <Tabs
        defaultActiveKey={currentTab}
        onChange={handleChangeCurrentTab}
        activeKey={currentTab}
        items={items}
      />
    </Demograhics>
  );
};

export default DemographicMain;
