import { create } from "zustand";
import { login, register, refreshToken, logout, getUserData } from "./api/api"; // Your API functions
import { persist, createJSONStorage } from "zustand/middleware";
import {jwtDecode} from "jwt-decode"; // For token expiration check

const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      accessToken: localStorage.getItem("accessToken"), 
      refreshToken: localStorage.getItem("refreshToken"),
      loading: false,
      error: null,

      setUser: (userData) => set({ user: userData, isAuthenticated: true, loading: false }),
      clearUser: () => set({ user: null, isAuthenticated: false, accessToken: null, refreshToken: null, loading: false, error: null }),
      setAccessToken: (token) => set({ accessToken: token }),
      setRefreshToken: (token) => set({ refreshToken: token }),
      setLoading: (isLoading) => set({ loading: isLoading }),
      setError: (err) => set({ error: err, loading: false }),

      login: async (loginRequest) => {
        set({ loading: true, error: null });
        try {
          const data = await login(loginRequest);
          set({ user: data.userData.user, isAuthenticated: true, accessToken: data.token, refreshToken: data.refreshToken, loading: false });
          return data;
        } catch (error) {
          set({ error: error.message || "Login failed", loading: false });
          throw error;
        }
      },

      register: async (signupRequest) => {
        set({ loading: true, error: null });
        try {
          const data = await register(signupRequest);
          set({ user: data.userData.user, isAuthenticated: true, accessToken: data.token, refreshToken: data.refreshToken, loading: false });
          return data;
        } catch (error) {
          set({ error: error.message || "Signup failed", loading: false });
          throw error; 
        }
      },

      isTokenExpired: () => {
        const accessToken = get().accessToken;
        if (accessToken) {
          try {
            const decoded = jwtDecode(accessToken);
            const expiry = decoded.exp * 1000; 
            return Date.now() >= expiry;
          } catch (error) {
            console.error("Error decoding token:", error);
            return true; 
          }
        }
        return true;
      },

      refresh: async () => {
        if (get().isTokenExpired()) {
          logout();
          return; 
        }

        set({ loading: true, error: null });
        try {
          const data = await refreshToken();
          set({ accessToken: data.accessToken, refreshToken: data.refreshToken, loading: false });
        } catch (error) {
          console.error("Token refresh failed:", error);
          set({ error: error.message || "Token refresh failed", loading: false });
          logout(); // Important: Logout on refresh failure
          throw error; // Re-throw to indicate failure
        }
      },

      logout: () => {
        logout(); // Call your API logout function
        set({ user: null, isAuthenticated: false, accessToken: null, refreshToken: null, loading: false, error: null });
      },

      fetchMe: async () => {
        set({ loading: true, error: null });
        try {
          const response = await getUserData();
          if (response.success) {
            set({ user: response.data, loading: false, isAuthenticated: true });
          } else {
            const errorMessage = response.message || "Failed to fetch user data";
            console.error("Fetch user data error:", errorMessage);
            set({ error: errorMessage, loading: false });
            if (response.status === 401) {
              logout();
            } else if (response.status === 403) {
              set({ isAuthenticated: false }); // Important: Set isAuthenticated to false
              try {
                await get().refresh();
                await get().fetchMe();
              } catch (refreshError) {
                console.error("Error refreshing token:", refreshError);
                logout();
                set({ error: null, loading: false, user: null }); // Clear user on refresh failure
              }
            }
          }
        } catch (error) {
          console.error("Fetch user data error:", error);
          const errorMessage = error.message || "Failed to fetch user data";
          set({ error: errorMessage, loading: false });
          if (error?.response?.status === 401) {
            logout();
          }
        }
      },
    })
    ,
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useAuthStore;