import { useState, useEffect, useCallback } from "react";
import { SelectUserInfo } from "@services/UserInfoService";

interface UserInfo {
    nickName: string;
    profile: string;
    bio: string;
}

export function useUserInfo() {
  const [info, setInfo] = useState<UserInfo | null>(null);

  // 사용자 정보 불러오기 함수
  const fetchData = useCallback(async () => {
    try {
      const data = await SelectUserInfo();
      if (!data) return;

      setInfo(data.info);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    info
  };
}