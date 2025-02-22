import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom"; // Import Navigate
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import HomePage from "./pages/HomePage";
import ErrorPage from "./pages/ErrorPage";
import ProtectedRoute from "./components/ProtectedRoute";
import Redirect from "./pages/Redirect";
import PublicLayout from "./components/PublicLayout";
import PrivateLayout from "./components/PrivateLayout";
import useAuthStore from './store'; // Import your auth store

const router = createBrowserRouter([
    {
        path: "/",
        element: (() => {
            const authStore = useAuthStore.getState();
            return authStore.isAuthenticated && localStorage.getItem('accessToken') ? <PrivateLayout /> : <PublicLayout />;
        })(),
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/home",
                element: (
                    <ProtectedRoute >
                        <HomePage />
                    </ProtectedRoute>
                ),
            },
        ],
    },
    {
        path: "/login",
        element: <LoginPage />,
    },
    {
        path: "/signup",
        element: <SignupPage />,
    },
    {
        path: "/oauth/redirect",
        element: <Redirect />,
    },
]);

createRoot(document.getElementById("root")).render(
    <>
        <RouterProvider
          future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true,
          }}        
        router={router} />
    </>
);
