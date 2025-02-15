import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import useAuthStore from '../store';
import Cookies from 'js-cookie';
import styled from 'styled-components';


const Redirect = () => {
    const authStore = useAuthStore();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    useEffect(() => {
        const handleOAuthRedirect = async () => {
            const success = searchParams.get('success');

            if (success === 'true') {
                await new Promise(resolve => setTimeout(resolve, 2000));

                if (!Cookies.get('accessToken') || !Cookies.get('refreshToken')) {
                    console.error("Missing tokens in OAuth redirect");
                    alert("OAuth Failed");
                    navigate('/');
                    return;
                }

                const accessToken = Cookies.get('accessToken');
                const refreshToken = Cookies.get('refreshToken');

                if (accessToken && refreshToken) {
                    localStorage.setItem('accessToken', accessToken);
                    localStorage.setItem('refreshToken', refreshToken);
                    authStore.setAccessToken(accessToken);
                    authStore.setRefreshToken(refreshToken);

                    try {
                        console.log("Fetching user after OAuth...");
                        await authStore.fetchMe();
                        // navigate('/home');
                        window.location.href = '/home';
                    } catch (error) {
                        console.error("Error fetching user after OAuth:", error);
                        authStore.clearUser();
                        navigate('/');
                    }
                } else {
                    console.error("Missing tokens in OAuth redirect");
                    navigate('/');
                }
            } else if (success === 'false') {
                alert("OAuth Failed");
                navigate('/'); 
            } else {
                console.warn("Invalid or missing 'success' parameter in OAuth redirect");
                navigate('/');
            }
        };

        handleOAuthRedirect(); 
    }, []); 

    useEffect(() => { 
        if (authStore.user) { 
            window.location.href = '/home';
        }
    }, [authStore.user]); 
            
    return (
        <RedirectContainer>
            <LoadingSpinner />
            <RedirectMessage>Redirecting... Please wait.</RedirectMessage>
        </RedirectContainer>
    );
};

export default Redirect;


const RedirectContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh; // Full viewport height
    background-color: #f0f0f0; // Example background color
`;

const LoadingSpinner = styled.div`
    border: 4px solid #f3f3f3; /* Light grey */
    border-top: 4px solid #3498db; /* Blue */
    border-radius: 50%;
    width: 50px;
    height: 50px;
    animation: spin 2s linear infinite; /* Animate the spinner */

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;


const RedirectMessage = styled.p`
    margin-top: 20px;
    font-size: 1.2em;
    color: #555; // Darker grey
`;
