import { useState, useEffect, useCallback, useRef } from "react";
import { SelectUserInfo } from "@services/UserInfoService";
import { getPublicProfileUrl } from "@services/supabaseClient";
import { useLocation, useNavigate } from "react-router-dom";

interface UserInfo {
  nickName: string;
  profile: string;
  bio: string;
}

export function useUserInfo() {
  const [info, setInfo] = useState<UserInfo | null>(null);
  const [isOwner, setIsOwner] = useState(false);
  const [sortOption, setSortOption] = useState("popular");
  const [showSortOptions, setShowSortOptions] = useState(false);
  const [showMypage, setShowMypage] = useState(false);
  const sortRef = useRef<HTMLDivElement | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  const fetchData = useCallback(async () => {
    try {
      const seachUuid = location.state?.uuid;
      const data = await SelectUserInfo(seachUuid);
      if (!data) return;
      setInfo(data.info);
      setIsOwner(data.isOwner);
    } catch (error) {
      console.error(error);
    }
  }, [location.state?.uuid]);
  
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const firstRenderRef = useRef(true);
  useEffect(() => {
    if (firstRenderRef.current) {
      firstRenderRef.current = false;
      return;
    }
    if (!showMypage) {
      fetchData();
    }
  }, [showMypage, fetchData]);

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

  const handleCreateCharacter = () => {
    navigate("/character/create");
  };

  return {
    info,
    isOwner,
    ProfileUrl, 
    sortOption,
    showSortOptions,
    sortRef,
    handleSortClick,
    handleSortOptionChange,
    handleCreateCharacter,
    showMypage,
    setShowMypage,
  };
}
