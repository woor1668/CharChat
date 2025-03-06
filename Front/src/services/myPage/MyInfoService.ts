import { api } from "../Api";

interface InfoResponse {
    info: {
      name: string;
      id: string;
      email: string;
      lang: string;
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

export const updateMyInfo = async (lang: string, isPw: boolean, pw: string) => {
  try {
    const response = await api.post<InfoResponse>("/myInfo/updateInfo", {
      lang,
      isPw,
      pw
    });
    return response.data;
  } catch (error) {
    console.error("create Error:", error);
    throw error;
  }
};
