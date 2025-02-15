import { useState } from "react";
import { BASE_URL } from "../api/api"; 
import { useNavigate , Link} from "react-router-dom"; 
import styled from "styled-components"; 
import useAuthStore from "../store"; 
import PublicHeader from "../components/PublicHeader";

// Styled Components for better styling
const LoginPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh; // Ensure full viewport height
  background-color: #f0f0f0; // Example background color
  font-family: sans-serif;
`;

const LoginForm = styled.form`
  background-color: white;
  padding: 30px; // Increased padding
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15); // Softer shadow
  display: flex;
  flex-direction: column;
  width: 350px; // Slightly wider
`;

const Title = styled.h1`
  margin-bottom: 20px;
  text-align: center; // Center the title
  color: #333; // Darker heading color
`;

const Input = styled.input`
  padding: 12px; // Increased padding
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box; // Prevent padding from affecting width
  font-size: 16px; // Larger font size
`;

const Button = styled.button`
  background-color: #007bff; // Example blue button
  color: white;
  padding: 12px 20px; // Increased padding
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px; // Larger font size
  transition: background-color 0.3s ease; // Smooth transition

  &:hover {
    background-color: #0056b3; // Darker blue on hover
  }
`;

const ErrorMessage = styled.p`
  color: red;
  margin-bottom: 15px;
  text-align: center; // Center error message
`;

const GoogleLoginButton = styled.button`
  background-color: #fff; // White background
  color: #4285f4; // Google blue
  padding: 12px 20px; // Increased padding
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center; // Vertically center icon and text
  justify-content: center; // Horizontally center icon and text
  margin-top: 15px; // Space from regular login button
  font-size: 16px; // Larger font size
  transition: background-color 0.3s ease; // Smooth transition

  img {
    width: 24px; // Slightly larger icon
    height: 24px;
    margin-right: 10px;
  }

  &:hover {
    background-color: #f0f0f0;
  }
`;

const NoAccount = styled.p`
    margin-top: 20px;
    text-align: center;
    color: #555; // Example color
`;

// Styled Link (using styled-components' as function)
const StyledLink = styled(Link)`
    color: #007bff; // Example link color
    text-decoration: none; // Remove underline
    margin-left: 5px; // Add some spacing
    &:hover {
        text-decoration: underline; // Add underline on hover
    }
`;


const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Add loading state
  const navigate = useNavigate();
  const authStore = useAuthStore(); // Get the authStore

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true); // Set loading to true

    try {
      const data = await authStore.login({ username, password });
      console.log("Login successful:", data);
      window.location.href = "/home";
    } catch (error) {
      console.error("Login failed:", error);

      if (error.message) {
        setError(error.message);
      } else if (error.status === 401) {
        setError("Invalid username or password.");
      } else if (error.request) {
        setError("Network error. Please try again later.");
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false); // Set loading to false in finally block
    }
  };

  const handleGoogleLogin = () => {
    console.log("Google login clicked");
    window.location.href = `${BASE_URL}/oauth2/authorization/google`;
  };

  return (
    <>
      <PublicHeader />
      <LoginPageContainer>
        <LoginForm onSubmit={handleSubmit}>
          <Title>Login</Title>

          {error && <ErrorMessage>{error}</ErrorMessage>}

          <Input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit" disabled={isLoading}>
            {" "}
            {/* Disable button while loading */}
            {isLoading ? "Logging in..." : "Login"} {/* Show loading message */}
          </Button>

          <GoogleLoginButton type="button" onClick={handleGoogleLogin}>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"
              alt="Google logo"
            />
            Login with Google
          </GoogleLoginButton>

          <NoAccount>
            Don't have an account? <StyledLink to="/signup">Signup</StyledLink>
          </NoAccount>
        </LoginForm>
      </LoginPageContainer>
    </>
  );
};

export default LoginPage;
