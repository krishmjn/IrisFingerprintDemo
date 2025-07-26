import React from "react";
import { HeartFilled } from "@ant-design/icons";
import { BodyWrapperDash, LogoWrapper, StyledLicense } from "./style";
const Dashboard = () => {
  return (
    <LogoWrapper>
      <img src="./nepalPoliceLogo.png" />
      <BodyWrapperDash>
        <h1>
          Welcome to Nepal Police
          <br />
          Biometric System
        </h1>
        <h2>
          &quot;कानुनी राज्यको मूल अवधारणाबाट निर्दिष्ट प्रभावकारी अपराध
          नियन्त्रण <br />र अनुसन्धान एवं कानुन कार्यान्वयनद्धारा समाजमा शान्ति,
          <br /> सुव्यवस्था एवं सुरक्षा स्थापना गर्न प्रतिवद्ध, राष्ट्रप्रति
          समर्पित, स्वच्छ एवं व्यवसायिक प्रहरी&quot;
        </h2>
      </BodyWrapperDash>
      <StyledLicense>
        {"Licensed to Nepal Police"} <br />
        <span>
          <a
            href="https://treeleaf.ai"
            target="_blank"
            rel="noopener noreferrer"
          >
            {"Made in Nepal with"} <HeartFilled style={{ color: "#ef2b2b" }} />
          </a>
        </span>
      </StyledLicense>
    </LogoWrapper>
  );
};

export default Dashboard;
