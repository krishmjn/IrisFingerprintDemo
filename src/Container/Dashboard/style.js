import styled from "styled-components";

export const LogoWrapper = styled.div`
  height: calc(100vh - 64px);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;
  gap: 32px;
  img {
    max-width: 10rem;

    @media (min-width: 900px) {
      max-width: 12rem;
    }
    @media (min-width: 1080px) {
      max-width: 14rem;
    }
    @media (min-width: 1300px) {
      max-width: 20rem;
    }
  }
`;

export const BodyWrapperDash = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;
  gap: 16px;
  text-align: center;
`;

export const StyledLicense = styled.div`
  position: absolute;
  bottom: 1rem;
  font-size: 0.8rem;
  text-align: center;
  a {
    text-decoration: underline;
  }
`;
