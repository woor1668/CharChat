import { api } from "../Api";

interface InfoResponse {
    info: {
      nickName: string;
      profileUrl: string;
      bio: string;
      agent: string;
    }
}

export const SelectMyInfo = async () => {
  try {
    const response = await api.post<InfoResponse>("/myInfo/selectInfo", {
    });
    return response.data;
  } catch (error) {
    console.error("create Error:", error);
    throw error;
  }
};

export const updateMyInfo = async (isPw: boolean, pw: string) => {
  try {
    const response = await api.post<InfoResponse>("/myInfo/updateInfo", {
      isPw,
      pw
    });
    return response.data;
  } catch (error) {
    console.error("create Error:", error);
    throw error;
  }
};
