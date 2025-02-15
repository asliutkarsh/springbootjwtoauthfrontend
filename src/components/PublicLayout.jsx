import { Outlet, Link } from 'react-router-dom';
import styled from 'styled-components'; // If you're using styled-components


// Styled Components (Example - adapt to your design)
const LandingPageContainer = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh; /* Ensure full viewport height */
    font-family: sans-serif; /* Example font */
    margin: 0; // Remove default margins
`;

const Header = styled.header`
    background-color: #f0f0f0; /* Example background color */
    padding: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const Logo = styled.h1`
    font-size: 1.5em;
`;

const Nav = styled.nav`
    display: flex;
`;

const NavItem = styled.div`
    margin-left: 20px;
`;

const HeroSection = styled.section`
    background-color: #e0e0e0; /* Example background color */
    padding: 100px;
    text-align: center;
`;

const HeroTitle = styled.h2`
    font-size: 3em;
    margin-bottom: 20px;
`;

const HeroSubtitle = styled.p`
    font-size: 1.2em;
    margin-bottom: 40px;
`;

const CallToAction = styled(Link)`
    background-color: #007bff; /* Example button color */
    color: white;
    padding: 15px 30px;
    text-decoration: none;
    border-radius: 5px;
    transition: background-color 0.3s ease;
    margin-right: 20px;
`;

const FeatureSection = styled.section`
    padding: 80px;
    text-align: center;
`;

const FeatureTitle = styled.h3`
    font-size: 2em;
    margin-bottom: 40px;
`;

const FeatureList = styled.ul`
    list-style: none;
    padding: 0;
    display: flex;
    justify-content: center;
    gap: 40px;
`;

const FeatureItem = styled.li`
    /* Style your feature items */
`;

const Footer = styled.footer`
    background-color: #333; /* Example background color */
    color: white;
    padding: 20px;
    text-align: center;
    margin-top: auto; /* Push footer to bottom */
`;

const PublicLayout = () => {
    return (
        <LandingPageContainer>
            <Header>
                <Logo>Spring Boot Oauth</Logo> 
            </Header>

            <HeroSection>
                <HeroTitle>Welcome to Spring Boot Oauth</HeroTitle>
                <HeroSubtitle> A simple and secure way to authenticate your users</HeroSubtitle>
                <CallToAction to="/login">Login</CallToAction>
                <CallToAction to="/signup">Sign Up</CallToAction>
            </HeroSection>

            {/* <FeatureSection> */}
                {/* <FeatureTitle>Key Features</FeatureTitle> */}
                {/* <FeatureList> */}
                    {/* <FeatureItem>Feature 1 description</FeatureItem> */}
                    {/* <FeatureItem>Feature 2 description</FeatureItem> */}
                    {/* <FeatureItem>Feature 3 description</FeatureItem> */}
                    {/* Add more features as needed */}
                {/* </FeatureList> */}
            {/* </FeatureSection> */}

            {/* Add more sections as needed (e.g., about us, testimonials, contact) */}

            <Footer>
                &copy; {new Date().getFullYear()} Utkarsh Jaiswal
            </Footer>

            <Outlet /> 
        </LandingPageContainer>
    );
};

export default PublicLayout;


