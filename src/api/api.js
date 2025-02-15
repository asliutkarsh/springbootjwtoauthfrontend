import axios from 'axios';
import useAuthStore from '../store'; // Import your Zustand store

export const BASE_URL = 'http://localhost:8080';
const API_BASE_URL = `${BASE_URL}/api/v1`;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Function to get the access token from local storage (useful for initial load)
export const getAccessToken = () => localStorage.getItem('accessToken');

// Create a new Axios instance *with* the Authorization header
const createApiWithHeader = () => {
  const authStore = useAuthStore.getState();

  const apiWithHeader = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (authStore.accessToken) {
    apiWithHeader.defaults.headers.common['Authorization'] = `Bearer ${authStore.accessToken}`;
    // console.log("Authorization header set (from state):", `Bearer ${authStore.accessToken}`);
  }
  return apiWithHeader;
};

export const login = async (loginRequest) => {
  try {
    const response = await api.post('/auth/login', loginRequest);
    const { token, refreshToken, ...userData } = response.data;
    if (token) {
      localStorage.setItem('accessToken', token);
      localStorage.setItem('refreshToken', refreshToken);
    }
    return { userData, token, refreshToken };
  } catch (error) {
    if (error.response) {
      throw {
        message: error.response.data.message || error.response.data || "Login failed",
        status: error.response.status,
      };
    } else if (error.request) {
      throw { message: "No response from the server" };
    } else {
      throw { message: error.message || "Login failed" };
    }
  }
};

export const register = async (signupRequest) => {
  try {
    const response = await api.post('/auth/register', signupRequest);
    const { token, refreshToken, ...userData } = response.data;
    if (token) {
      localStorage.setItem('accessToken', token);
      localStorage.setItem('refreshToken', refreshToken);
    }
    return { userData, token, refreshToken };
  } catch (error) {
    if (error.response) {
      throw {
        message: error.response.data.message || error.response.data || "Registration failed",
        status: error.response.status,
      };
    } else if (error.request) {
      throw { message: "No response from the server" };
    } else {
      throw { message: error.message || "Registration failed" };
    }
  }
};

export const refreshToken = async () => {
  const refreshToken = localStorage.getItem('refreshToken');
  if (!refreshToken) {
    throw new Error("No refresh token available");
  }

  try {
    const response = await api.post('/auth/refresh-token', { refreshToken });
    const { accessToken, refreshToken: newRefreshToken } = response.data;

    if (accessToken) {
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', newRefreshToken || refreshToken);
      // No need to call setAuthHeader here
      return { accessToken, refreshToken: newRefreshToken || refreshToken };
    } else {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      throw new Error("Refresh token request failed");
    }
  } catch (error) {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    if (error.response) {
      throw {
        message: error.response.data.message || error.response.data || "Token refresh failed",
        status: error.response.status,
      };
    } else if (error.request) {
      throw { message: "No response from the server" };
    } else {
      throw { message: error.message || "Token refresh failed" };
    }
  }
};

export const logout = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  // No need to call setAuthHeader here
};

export const getUserData = async () => {
  const apiWithHeader = createApiWithHeader(); // Get the API instance with the header

  try {
    console.log("Making protected request...");
    const response = await apiWithHeader.get('/users/me'); // Use apiWithHeader
    // console.log("Protected data response:", response);
    return response.data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401) {
        try {
          const refreshResponse = await refreshToken();
          if (refreshResponse) {
            // Update the access token in the Zustand store after refresh
            useAuthStore.getState().setAccessToken(refreshResponse.accessToken); 
            return await getUserData(); // Retry the request
          } else {
            throw new Error("Token refresh failed");
          }
        } catch (refreshError) {
          logout();
          throw refreshError;
        }
      }
      throw {
        message: error.response.data.message || error.response.data || "Protected data request failed",
        status: error.response.status,
      };
    } else if (error.request) {
      throw { message: "No response from the server" };
    } else {
      throw { message: error.message || "Protected data request failed" };
    }
  }
};

export default api; // Export the base api (for login/register)