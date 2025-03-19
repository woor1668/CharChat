import { api } from "@services/Api";

interface StepResponse {
  steps: {
    label: string;
    path: string;
    isRequired: boolean;
  }
}

// 회원가입 API
export const getStep = async () => {
  try {
    const response = await api.post<StepResponse>("/character/create/getStep", {
    });
    return response.data;
  } catch (error) {
    console.error("Register Error:", error);
    throw error;
  }
};