import styled from 'styled-components';

const ErrorPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f0f0f0; /* Light gray background */
  font-family: sans-serif;
`;

const ErrorCode = styled.h1`
  font-size: 5rem;
  color: #e74c3c; /* Red for error */
  margin-bottom: 1rem;
`;

const ErrorMessage = styled.p`
  font-size: 1.5rem;
  color: #333; /* Dark gray text */
  margin-bottom: 2rem;
  text-align: center; /* Center the text */
`;

const HomeLink = styled.a`
  padding: 0.8rem 1.5rem;
  background-color: #3498db; /* Blue button */
  color: white;
  text-decoration: none;
  border-radius: 5px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #2980b9; /* Darker blue on hover */
  }
`;

const ImageContainer = styled.div`
  margin-bottom: 2rem; /* Space between image and text */
`;

const ErrorImage = styled.img`
  max-width: 300px; /* Adjust as needed */
  height: auto;
`;


const ErrorPage = () => {
  return (
    <ErrorPageContainer>
      <ImageContainer>
         {/* You can use a local image or a URL */}
         
        <ErrorImage src="/error.svg" alt="404 - Page Not Found" />  {/* Example using a local image */}
        {/* <ErrorImage src="https://example.com/404.png" alt="404 - Page Not Found" /> Example using a URL */}
      </ImageContainer>
      <ErrorCode>404</ErrorCode>
      <ErrorMessage>Oops! The page you&apos;re looking for can&apos;t be found.</ErrorMessage>
      <HomeLink href="/">Go Home</HomeLink>
    </ErrorPageContainer>
  );
};

export default ErrorPage;