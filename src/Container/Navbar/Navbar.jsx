import React from "react";
import { HeaderLink, StyledHeader } from "./style";
import { useNavigate, useLocation } from "react-router-dom";
import { navlogo } from "../../assets/icons";
import IconWrapper from "../../Components/IconWrapper/IconWrapper";
const NavBar = () => {
  const location = useLocation();
  const navstyles = {
    width: "93.769px",
    height: "39.008px",
    marginTop: "13px",
    marginLeft: "40px",
    cursor: "pointer",
  };

  const linksContainerStyle = {
    display: "flex",
    gap: "1.5rem",
    alignItems: "center",
    marginRight: "2.5rem",
  };

  const navigate = useNavigate();
  return (
    <StyledHeader>
      <IconWrapper
        icon={navlogo}
        styles={navstyles}
        onClick={() => navigate("/")}
      />
      <div style={linksContainerStyle}>
        <HeaderLink
          className={location.pathname === "/fingerprint" && "active--link"}
          onClick={() => navigate("/fingerprint")}
        >
          {"Templates"}
        </HeaderLink>
        <HeaderLink
          className={location.pathname === "/search" && "active--link"}
          onClick={() => navigate("/search")}
        >
          {"Search"}
        </HeaderLink>

        {/* <HeaderLink
            className={location.pathname === "/watch-list" && "active--link"}
            href="/"
          >
            {t("Watch List")}
          </HeaderLink>

          <HeaderLink
            className={location.pathname === "/api" && "active--link"}
            href="/"
          >
            {t("API")}
          </HeaderLink> */}
      </div>
    </StyledHeader>
  );
};

export default NavBar;
