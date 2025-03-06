// src/services/socialLoginAPI.tsx

/**
 * 임의의 문자열(랜덤 state) 생성 함수
 * (참고: 이 방법은 간단한 예시이며, 보안용으로는 crypto API 사용을 권장)
 */
function generateRandomState(length: number = 16): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

/**
 * 네이버 로그인: 네이버 OAuth2.0 URL로 리다이렉트
 */
export function handleNaverLogin(): void {
  const clientId = import.meta.env.VITE_NAVER_CLIENT_ID as string;
  const callbackUrl =
    import.meta.env.VITE_NAVER_CALLBACK_URL || "http://localhost:5173/oauth/naver";
  const state = generateRandomState();
  const naverAuthUrl = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${clientId}&state=${state}&redirect_uri=${encodeURIComponent(
    callbackUrl
  )}`;
  window.location.href = naverAuthUrl;
}

/**
 * 카카오 로그인: 카카오 OAuth2.0 URL로 리다이렉트
 */
export function handleKakaoLogin(): void {
  const clientId = import.meta.env.VITE_KAKAO_KEY as string;
  const redirectUri =
    import.meta.env.VITE_KAKAO_REDIRECT_URI ||
    "http://localhost:5173/oauth/kakao";
  const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(
    redirectUri
  )}&response_type=code`;
  window.location.href = kakaoAuthUrl;
}

/**
 * 구글 로그인: 구글 OAuth2.0 URL로 리다이렉트
 */
export function handleGoogleLogin(): void {
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID as string;
  const redirectUri =
    import.meta.env.VITE_GOOGLE_REDIRECT_URI ||
    "http://localhost:5173/oauth/google";
  const scope = "email profile";
  const state = generateRandomState();
  const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(
    redirectUri
  )}&scope=${encodeURIComponent(scope)}&state=${state}`;
  window.location.href = googleAuthUrl;
}

/**
 * 애플 로그인: 애플 OAuth2.0 URL로 리다이렉트
 */
export function handleAppleLogin(): void {
  const clientId = import.meta.env.VITE_APPLE_CLIENT_ID as string;
  const redirectUri =
    import.meta.env.VITE_APPLE_REDIRECT_URI ||
    "http://localhost:5173/oauth/apple";
  const state = generateRandomState();
  const scope = "name email";
  const responseType = "code id_token";
  const responseMode = "form_post";
  const appleAuthUrl = `https://appleid.apple.com/auth/authorize?response_type=${encodeURIComponent(
    responseType
  )}&client_id=${clientId}&redirect_uri=${encodeURIComponent(
    redirectUri
  )}&state=${state}&scope=${encodeURIComponent(scope)}&response_mode=${responseMode}`;
  window.location.href = appleAuthUrl;
}
