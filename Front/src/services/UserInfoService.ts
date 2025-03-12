import { api } from "./Api";

interface InfoResponse {
    info: {
      nickName: string;
      profile: string;
      bio: string;
    }
}

export const SelectUserInfo = async () => {
  try {
    const response = await api.post<InfoResponse>("/userInfo/selectInfo", {
    });
    return response.data;
  } catch (error) {
    console.error("create Error:", error);
    throw error;
  }
};