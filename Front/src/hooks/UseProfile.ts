import { useState, useEffect, useCallback, useRef } from "react";
import { SelectUserInfo } from "@services/UserInfoService";
import { getPublicProfileUrl } from "@services/supabaseClient";

interface UserInfo {
  nickName: string;
  profile: string;
  bio: string;
  isOwner?: boolean;
}

export function useUserInfo() {
  const [info, setInfo] = useState<UserInfo | null>(null);
  const [sortOption, setSortOption] = useState("popular");
  const [showSortOptions, setShowSortOptions] = useState(false);
  const [showMypage, setShowMypage] = useState(false);
  const sortRef = useRef<HTMLDivElement | null>(null);
  const fetchData = useCallback(async () => {
    try {
      const data = await SelectUserInfo();
      if (!data) return;
      debugger;
      setInfo(data.info);
    } catch (error) {
      console.error(error);
    }
  }, []);
  
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // 정렬 옵션 관련 핸들러
  const handleSortClick = useCallback((event: React.MouseEvent) => {
    event.stopPropagation();
    setShowSortOptions((prev) => !prev);
  }, []);

  const handleSortOptionChange = useCallback((option: string) => {
    setSortOption(option);
    setShowSortOptions(false);
  }, []);

  useEffect(() => {
    if (!showSortOptions) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
        setShowSortOptions(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [showSortOptions]);

  const ProfileUrl = getPublicProfileUrl(info?.profile ?? null);

  return {
    info, ProfileUrl, 
    sortOption, showSortOptions, sortRef,
    handleSortClick, handleSortOptionChange,
    showMypage, setShowMypage,
  };
}
