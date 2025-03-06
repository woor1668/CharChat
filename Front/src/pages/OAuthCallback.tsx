// src/pages/OAuthCallback.tsx
import { useLocation } from "react-router-dom";
import styled from "styled-components";

const CallbackContainer = styled.div`
  padding: 20px;
  text-align: center;
`;

/**
 * URL 쿼리 파라미터를 쉽게 사용하기 위한 커스텀 Hook
 */
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

/**
 * URL 경로에서 소셜 로그인 제공자 추출 (예: /oauth/naver → "네이버")
 */
function getProviderName(pathname: string): string {
  const parts = pathname.split("/");
  const providerKey = parts[parts.length - 1].toLowerCase();
  const providerMap: Record<string, string> = {
    naver: "네이버",
    kakao: "카카오",
    google: "구글",
    apple: "애플",
  };
  return providerMap[providerKey] || providerKey;
}

export default function OAuthCallback() {
  const location = useLocation();
  const query = useQuery();
  const code = query.get("code");
  const state = query.get("state");
  const error = query.get("error");
  const errorDesc = query.get("error_description");

  const providerName = getProviderName(location.pathname);

  return (
    <CallbackContainer>
      <h2>소셜 로그인 Callback</h2>
      {error ? (
        <>
          <p>{providerName} 로그인 에러: {error}</p>
          <p>{errorDesc}</p>
        </>
      ) : (
        <>
          <p>{providerName} 인가 코드: {code}</p>
          <p>{providerName} state: {state}</p>
        </>
      )}
      <p>해당 파라미터들을 백엔드로 전달해 인증을 진행하세요.</p>
    </CallbackContainer>
  );
}
