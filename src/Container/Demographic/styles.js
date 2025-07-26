import { Button, Tabs } from "antd";
import styled from "styled-components";

export const DemographicWrapper = styled.div`
  margin-top: 20px;
  position: relative;
`;
export const StyledTab = styled(Tabs)`
  .ant-tabs-nav-wrap .ant-tabs-nav-list {
    display: flex;
    justify-content: space-around;
    width: 100%;
  }
  .ant-tabs-nav {
    margin: 0;
  }
`;
export const Demograhics = styled.div`
  margin: 10% auto;
  width: 60%;
  padding: 10px;
  background-color: #f0f2f5;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  .ant-tabs {
    margin-top: 20px;
  }
  ${
    "" /* .ant-tabs-tab {
    font-weight: bold;
    font-size: 16px;
  } */
  }
`;
export const NextButton = styled(Button)`
  position: relative;
  left: 320px;
  z-index: 10;
  width: 100px;
`;
