import { api } from "./Api";
interface AuthResponse {
  token: string;
  lang: string;
}

// 회원가입 API
export const registerUser = async (name: string, email: string, id: string, pw: string) => {
  try {
    const response = await api.post<AuthResponse>("/auth/register", {
      name,
      email,
      id,
      pw,
    });
    return response.data;
  } catch (error) {
    console.error("Register Error:", error);
    throw error;
  }
};

// 로그인 API
export const loginUser = async (eid: string, pw: string) => {
  try {
    const response = await api.post<AuthResponse>("/auth/login", {
      eid,
      pw,
    });
    if (response.data) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("lang", response.data.lang);
    }
    return response.data;
  } catch (error) {
    console.error("Login Error:", error);
    throw error;
  }
};

// 인증 확인 API
export const getAuth = async (): Promise<boolean> => {
  const token = localStorage.getItem("token");
  if (!token) {
    console.error("인증 실패: 토큰 없음");
    return false;
  }
  try {
    const response = await api.get<AuthResponse>("/auth/auth", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.status === 200;
  } catch (error) {
    console.error("인증 실패:", error);
    return false;
  }
};

// 로그아웃 API (토큰 삭제)
export const logoutUser = () => {
  localStorage.removeItem("token");
};
