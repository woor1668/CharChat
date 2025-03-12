import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom"
import styled from "styled-components";
import Register from '@pages/auth/Register';
import Login from '@pages/auth/Login'
import OAuthResult from "@pages/auth/OAuthResult";
import Home from '@pages/Home';
import Profile from '@pages/Profile';
import MyPage from '@pages/MyPage';
import Chat from "./pages/Chat";
import { getAuth } from "@services/AuthService";
import { PopupProvider } from "@components/common/Popup";
import { ReactNode, useEffect, useState } from "react";
import LoadingScreen from "@components/loading-screen";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const authStatus = await getAuth();
      setIsAuthenticated(authStatus);
    };
    checkAuth();
  }, []);

  if (isAuthenticated === null) {
    return <LoadingScreen />;
  }

  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

const router = createBrowserRouter([
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/oauth-result", element: <OAuthResult />},
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
    children: [
      // { path:"/notice/:id", element:<Notice />},
      { path: "", element: <Chat /> },
      { path: "my", element: <MyPage /> },
      { path: "/profile", element: <Profile />},
    ],
  },
]);

const App = () => {
  return (
    <StyledWrapper>
      <PopupProvider>
        <RouterProvider router={router} />
      </PopupProvider>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default App;