import { api } from "./Api";

interface InfoResponse {
    info: {
      uuid: string;
      nickName: string;
      profile: string;
      bio: string;
    }
}

export const SelectUserInfo = async (uuid: string) => {
  try {
    const response = await api.post<InfoResponse>("/userInfo/selectInfo", {
      uuid
    });
    return response.data;
  } catch (error) {
    console.error("create Error:", error);
    throw error;
  }
};