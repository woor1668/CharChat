import { api } from "./Api";

interface InfoResponse {
    info: {
      nickName: string;
      profileUrl: string;
    }
}

export const SelectUserInfo = async () => {
  try {
    console.log(11);
    const response = await api.post<InfoResponse>("/userInfo/selectInfo", {
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("create Error:", error);
    throw error;
  }
};