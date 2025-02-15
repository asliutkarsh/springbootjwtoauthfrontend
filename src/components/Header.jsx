import useAuthStore from '../store';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';


const HeaderStyled = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    background-color: #333;
    color: white;
`;

const LogoutButton = styled.button`
    background-color: #007bff;
    color: white;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;
    transition: background-color 0.3s ease;

    &:hover {  
        background-color: #0056b3;
    }
`;

const Header = () => {
    const authStore = useAuthStore();
    const navigate = useNavigate();

    const handleLogout = () => {
        authStore.logout();
        window.location.href = '/';
    };

    return (
        <HeaderStyled> {/* Use a styled component */}
            <h4>Welcome to Spring Boot JWT OAuth Frontend</h4>
            <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
        </HeaderStyled>
    );
};

export default Header;