import { checkApiKeyValidityForAi, SelectMyAPI, CreateMyAPI, toggleChange } from "@services/myPage/MyApiService";
import { useState, useEffect, useCallback } from "react";
import { usePopup } from "./UsePopup";
import { SelectMyInfo, updateMyInfo } from "@src/services/myPage/MyInfoService";
import { usePasswordValidation } from "./UsePasswordValidation";

interface UserInfo {
  name: string;
  id: string;
  email: string;
  lang: string;
}

const TOGGLE_LOCK_TIME = 30000;

// MyInfo hooks
export function useMyInfo() {
  const [info, setInfo] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedLang, setSelectedLang] = useState<string>("eng");
  const [showPwInput, setShowPwInput] = useState(false);

  const { showAlert } = usePopup();

  // 사용자 정보 불러오기 함수
  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const data = await SelectMyInfo();
      if (!data) return;

      setInfo(data.info);
      setSelectedLang(data.info.lang);
      setShowPwInput(false);
      setPassword('');
      setRePassword('');
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const {
    password, setPassword,
    showPassword, setShowPassword,
    rePassword, setRePassword,
    showRePassword, setShowRePassword,
    isCfPw, isValPw
  } = usePasswordValidation();

  // 언어 변경 핸들러
  const handleLangChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLang(e.target.value);
  };

  // 패스워드 입력 여부 토글
  const handlePasswordChange = () => {
    setShowPwInput((prev) => !prev);
  };

  // 정보 저장 핸들러
  const handleSave = useCallback(async () => {
    if (showPwInput && !(isValPw && isCfPw)) {
      showAlert({ message: "비밀번호 조건이 일치하지 않습니다." });
      return;
    }

    if (loading) return;
    setLoading(true);

    try {
      await updateMyInfo(selectedLang, showPwInput, password);
      showAlert({ message: "저장되었습니다.", header: "성공" });
      await fetchData();
    } catch (error) {
      showAlert({ message: "저장에 실패하였습니다.", header: "오류" });
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [loading, isValPw, isCfPw, selectedLang, showPwInput, password, fetchData, showAlert]);

  return {
    info, isCfPw, isValPw, loading,
    selectedLang, showPwInput,
    password, setPassword,
    showPassword, setShowPassword,
    rePassword, setRePassword,
    showRePassword, setShowRePassword,
    handleLangChange, handlePasswordChange, handleSave,
  };
}


// MyAPI hooks
export function useMyApi(
  title: string,
  activeApi: string,
  setActiveApi: React.Dispatch<React.SetStateAction<string>>
) {
  const [apiKey, setApiKey] = useState("");
  const [err, setErr] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const { showAlert } = usePopup();

  // 토글 버튼 비활성화를 일정 시간동안 유지하는 함수
  const disableToggle = useCallback(() => {
    setIsDisabled(true);
    setTimeout(() => setIsDisabled(false), TOGGLE_LOCK_TIME);
  }, []);

  // 새로고침 토큰 비활성화 유지
  useEffect(() => {
    const lockTimestamp = localStorage.getItem("toggleLockTime");
    if (lockTimestamp) {
      const elapsed = Date.now() - parseInt(lockTimestamp, 10);
      if (elapsed < TOGGLE_LOCK_TIME) {
        setIsDisabled(true);
        setTimeout(() => setIsDisabled(false), TOGGLE_LOCK_TIME - elapsed);
      }
    }
  }, []);

  // API의 유효성을 검증하는 함수
  const validateApiKey = useCallback(
    async (key: string) => {
      setErr("");
      const valid = await checkApiKeyValidityForAi(title, key);
      if (!valid) {
        setErr("잘못된 API_KEY입니다");
        return false;
      }
      return true;
    },
    [title]
  );

  // title이 변경될 때 사용자 데이터를 불러옴
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setErr("");
      try {
        const data = await SelectMyAPI(title);
        if (!data) {
          setApiKey("");
          return;
        }
        const { api } = data;
        const key = api.ai === title ? api.api_key : "";
        setApiKey(key);

        if (api.checked) {
          setActiveApi(api.ai);
        }

        const valid = await validateApiKey(key);
        setIsValid(valid);
      } catch (error) {
        console.error(error);
        setApiKey("");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [title, setActiveApi, validateApiKey]);

  // API를 저장하는 함수
  const handleSave = useCallback(async () => {
    if (loading) return;
    setLoading(true);
    setErr("");
    try {
      await CreateMyAPI(title, apiKey);
      await showAlert({ message: "저장되었습니다.", header: "성공" });
      const valid = await validateApiKey(apiKey);
      setIsValid(valid);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [loading, title, apiKey, showAlert, validateApiKey]);

  // API 활성화 토글 함수
  const handleToggle = useCallback(() => {
    if (isDisabled) return;
    const newActiveApi = activeApi === title ? "" : title;
    setActiveApi(newActiveApi);
    toggleChange(newActiveApi);
    localStorage.setItem("toggleLockTime", Date.now().toString());
    disableToggle();
  }, [activeApi, title, setActiveApi, isDisabled, disableToggle]);

  return {
    title,
    apiKey,
    setApiKey,
    err,
    isValid,
    handleSave,
    handleToggle,
    isDisabled,
    loading,
  };
}
