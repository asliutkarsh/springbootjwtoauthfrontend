import { Link } from "react-router-dom";
import styled from "styled-components";

const HeaderContainer = styled.header`
  background-color: #f0f0f0; // Example background color
  padding: 10px 20px;
  display: flex;
  justify-content: space-between; // Space logo and nav
  align-items: center;
`;

const LogoContainer = styled.div`
  /* Style your logo container */
  display: flex;
  align-items: center; // Vertically center the logo
`;

const Logo = styled.h1`
  font-size: 1.5em;
`;


const PublicHeader = () => {
return (
    <HeaderContainer>
        <LogoContainer>
            <Link to="/">
                <Logo>Spring Boot Oauth</Logo>
            </Link>
        </LogoContainer>
    </HeaderContainer>
);
};

export default PublicHeader;
