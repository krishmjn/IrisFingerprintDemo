import { styled } from "styled-components";
import { Layout } from "antd";
const { Header } = Layout;

export const StyledHeader = styled(Header)`
  display: flex;
  justify-content: space-between;
  background-color: #dbe8fe;
  border-bottom: 1px solid #b6d0fc;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.06);
  position: sticky;
  width: 100%;
  top: 0;
  z-index: 2;
  padding-inline: 0px;
  .logo {
    padding: 0.7rem;
  }

  img {
    height: 100%;
  }

  .active--link {
    position: relative;
  }
  .active--link::after {
    display: block;
    content: "";
    width: 100%;
    max-width: 5.375rem;
    height: 0.3125rem;
    background: #498af8;
    position: absolute;
    top: 41px;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 0.3125rem 0.3125rem 0rem 0rem;
  }
`;

export const HeaderLink = styled.a`
  margin: 20px;
  color: #444;
  font-size: 1rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;

  &:hover {
    color: #444444;
  }
`;

export const DropdownItem = styled.a`
  font-size: 16px;
  color: #666;
`;

export const AccountNameItem = styled.div`
  width: 100%;
  text-align: center;
  padding: 0.75rem;
  border-bottom: 1px solid #f0edf1;

  .username {
    font-size: 1rem;
    font-weight: 500;
    color: #444;
  }

  .role {
    color: #666;
    font-size: 0.8125rem;
  }
`;
