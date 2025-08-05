import styled from "styled-components";

export const TabWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  justify-content: center;
  .number-outer {
    display: flex;
    justify-content: center;
  }
  .number {
    background: #d9d9d9;
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    color: #ffffff;
  }
  .completed {
    background: #498af8;
  }
  .label {
    color: #444;
    font-family: Poppins;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }
`;
