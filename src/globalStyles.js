import { createGlobalStyle } from "styled-components";
import { tick } from "./assets/icons";

const GlobalStyle = createGlobalStyle`
  /* Import Poppins from Google Fonts */
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');

  html,
  body {
    height: 100%;
    width: 100%;
    overflow-X: hidden;
    background: #FAFAFA;
    font-family: 'Poppins', sans-serif;
  }

  #app {
    background-color: #fafafa;
    min-height: 100%;
    min-width: 100%;
    font-family: 'Poppins', sans-serif;
  }

  p {
    padding-top: 5px;
    font-size: 12px;
    text-align: center;
    color: #666666;
    font-family: 'Poppins', sans-serif;
  }

  * {
    padding: 0;
    margin: 0;
    font-family: 'Poppins', sans-serif;
  }

  .ant-select-item-option-selected::after {
    content: url(${tick});
  }

  .ant-dropdown .ant-dropdown-menu .ant-dropdown-menu-item-selected {
    display: flex;
    flex-direction: row-reverse;
  }

  .ant-dropdown .ant-dropdown-menu .ant-dropdown-menu-item .anticon-check {
    display: none;
  }

  .ant-dropdown .ant-dropdown-menu .ant-dropdown-menu-item-selected .anticon-check {
    display: block;
    margin-right: auto;
  }

  .ant-menu-light .ant-menu-item {
    margin: 0;
    padding: 0px 40px;
    width: 100%;
    border-radius: 0px;
    height: 48px;
  }

  .ant-menu-light .ant-menu-item-selected:before {
    content: "";
    position: absolute;
    left: 0px;
    width: 5px;
    height: 48px;
    border-radius: 0px 5px 5px 0px; 
    background: #498AF8;
  }

  .ant-dropdown .ant-dropdown-menu .ant-dropdown-menu-item,
  .ant-dropdown .ant-dropdown-menu .ant-dropdown-menu-submenu .ant-dropdown-menu-submenu-title {
    padding: 12px;
    color: #666666;
  }

  .ant-select-item-option-state {
    display: none !important;
  }

  .ant-dropdown .ant-dropdown-menu .ant-dropdown-menu-submenu .ant-dropdown-menu-submenu-title {
    display: flex;
    align-items: center;
    color: #666666;   
  }

  .ant-dropdown .ant-dropdown-menu .ant-dropdown-menu-item .hover-white {
    filter: invert(20%) sepia(99%) saturate(6659%) hue-rotate(358deg) brightness(103%) contrast(113%);
  }

  .ant-dropdown .ant-dropdown-menu .ant-dropdown-menu-item:hover .hover-white {
    filter: brightness(1) saturate(100%) invert(99%) sepia(1%) saturate(214%) hue-rotate(32deg) brightness(188%) contrast(100%);
  }

  .ant-btn-primary {
    background-color: #498AF8;
  }
`;

export default GlobalStyle;
