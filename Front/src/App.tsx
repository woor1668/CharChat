  import { createBrowserRouter, RouterProvider } from "react-router-dom";
  import styled from "styled-components";
  import Register from '@pages/auth/Register';
  import Login from '@pages/auth/Login'
  import OAuthResult from "@pages/auth/OAuthResult";
  import Home from '@pages/Home';
  import Profile from '@pages/Profile';
  import MyPage from '@pages/MyPage';
  import Main from "@pages/Main";
  import CharacterCreator from "@pages/character/create/CharacterCreator";
  import { PopupProvider } from "@components/common/Popup";
  import { ProtectedRoute } from "@components/common/ProtectedRoute";

  // ----- [라우터 설정] -----
  const router = createBrowserRouter([
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
    { path: "/oauth-result", element: <OAuthResult /> },
    { path: "/character/create", element: <CharacterCreator /> },
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>
      ),
      children: [
        { path: "", element: <Main /> },
        { path: "my", element: <MyPage /> },
        { path: "profile", element: <Profile /> }, 
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
