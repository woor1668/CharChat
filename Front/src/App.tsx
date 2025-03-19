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
import Step1 from "@create/step/Step1";
import Step2 from "@create/step/Step2";
import Step3 from "@create/step/Step3";
import Step4 from "@create/step/Step4";
import Step5 from "@create/step/Step5";
import Step6 from "@create/step/Step6";

  // ----- [라우터 설정] -----
  const router = createBrowserRouter([
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
    { path: "/oauth-result", element: <OAuthResult /> },
    { path: "/character/create", element: <CharacterCreator /> ,
      children: [
        { path: "profile", element: <Step1 /> },
        { path: "detail", element: <Step2 /> },
        { path: "service", element: <Step3 /> },
        { path: "media", element: <Step4 /> },
        { path: "guidebook", element: <Step5 /> },
        { path: "registration", element: <Step6 /> },
      ],
    },
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
