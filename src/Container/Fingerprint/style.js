import styled from "styled-components";
import { Button, Form, Steps, Tabs } from "antd";

export const FingerprintWrapper = styled.div`
  padding: 20px;
  position: relative;
  margin: 40px auto;
`;

export const FormWrapper = styled.div`
  margin-top: 20px;
  position: relative;
`;
export const StyledForm = styled(Form)`
  .ant-form-item-label {
    text-align: start;
  }
`;

export const StyledSteps = styled(Steps)`
  &.ant-steps {
    padding: 20px;
    background-color: #fafafa;
    border-radius: 8px;
  }
`;

export const MetaData = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;
`;
export const DataLabel = styled.span`
  font-weight: bold;
  color: #333;
  display: block;
  margin-bottom: 5px;
`;

export const Value = styled.span`
  color: #555;
  font-weight: normal;
`;
