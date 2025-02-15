import { useState } from "react";
import useAuthStore from "../store";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import { BASE_URL } from "../api/api";
import PublicHeader from "../components/PublicHeader";

// Styled Components
const SignupPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #f0f0f0;
  font-family: sans-serif;
`;

const SignupForm = styled.form`
  background-color: white;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  width: 350px;
`;

const Title = styled.h1`
  margin-bottom: 20px;
  text-align: center;
  color: #333;
`;

const Input = styled.input`
  padding: 12px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  font-size: 16px;
`;

const Button = styled.button`
  background-color: #007bff;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  margin-bottom: 15px;
  text-align: center;
`;

const GoogleSignupButton = styled.button`
  background-color: #fff;
  color: #4285f4;
  padding: 12px 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 15px;
  font-size: 16px;
  transition: background-color 0.3s ease;

  img {
    width: 24px;
    height: 24px;
    margin-right: 10px;
  }

  &:hover {
    background-color: #f0f0f0;
  }
`;

const HaveAccount = styled.p`
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

const SignupPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const authStore = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const data = await authStore.register({ username, email, password });
      console.log("Signup successful:", data);
      navigate("/home");
    } catch (error) {
      console.error("Signup failed:", error);
      setError(
        error.message || "Signup failed. Please check your information."
      );
    }
  };

  const handleGoogleLogin = () => {
    console.log("Google login clicked");
    window.location.href = `${BASE_URL}/oauth2/authorization/google`;
  };

  return (
    <>
      <PublicHeader />
      <SignupPageContainer>
        <SignupForm onSubmit={handleSubmit}>
          <Title>Signup</Title>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <Input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <Button type="submit">Signup</Button>

          <GoogleSignupButton type="button" onClick={handleGoogleLogin}>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"
              alt="Google logo"
            />
            Signup with Google
          </GoogleSignupButton>

          <HaveAccount>
            Already have an account? <StyledLink to="/login">Login</StyledLink>
          </HaveAccount>
        </SignupForm>
      </SignupPageContainer>
    </>
  );
};

export default SignupPage;
