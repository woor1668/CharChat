import axios from 'axios';
import env from "@config/config";
import jwt from "jsonwebtoken";
import { randomBytes } from "crypto";
import { Request, Response } from "express";
import { authUser, createUser, findUserByEmail } from '@src/models/userModel';

const JWT_SECRET = env.JWT_SECRET || "default_secret";
/**
 * 임의의 문자열(랜덤 state) 생성 함수
 * (참고: 이 방법은 간단한 예시이며, 보안용으로는 crypto API 사용을 권장)
 */
function generateRandomState(length: number = 16): string {
  const bytes = randomBytes(length);
  return bytes.toString('base64').substring(0, length);
}

/**
 * 네이버 로그인: 네이버 OAuth2.0 URL로 리다이렉트
 */
export const naverLogin = async (req: Request, res: Response): Promise<void> => {
  const clientId = env.NAVER_CLIENT_ID;
  const callbackUrl = "http://localhost:5000/oauth/naverCallBack";
  const state = generateRandomState();
  const naverAuthUrl = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${clientId}&state=${state}&redirect_uri=${encodeURIComponent(callbackUrl)}`;

  res.redirect(naverAuthUrl);
};

export const naverCallBack = async (req: Request, res: Response): Promise<void> => {
  const code = req.query.code;
  const state = req.query.state;
  const agent = 'naver';

  const clientId = env.NAVER_CLIENT_ID;
  const clientSecret = env.NAVER_CLIENT_SECRET;
  const redirectUri = 'http://localhost:5000/oauth/naverCallBack';

  try {
    const tokenResponse = await axios.post('https://nid.naver.com/oauth2.0/token', null, {
      params: {
        grant_type: 'authorization_code',
        client_id: clientId,
        client_secret: clientSecret,
        code,
        state,
        redirect_uri: redirectUri,
      },
    });

    const { access_token } = tokenResponse.data;

    const profileResponse = await axios.get('https://openapi.naver.com/v1/nid/me', {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
  
    const profileData = profileResponse.data;
    console.log('User Profile:', profileData);
    await oauthLogin(profileData, agent, res);
  } catch (error) {
    console.error('Error fetching access token:', error);
    res.status(500).send('Error fetching access token');
  }
};

/**
 * 카카오 로그인: 카카오 OAuth2.0 URL로 리다이렉트
 */
export const kakaoLogin = async (req: Request, res: Response): Promise<void> => {
  const clientId = env.KAKAO_KEY as string;
  const redirectUri =
    env.KAKAO_REDIRECT_URI ||
    "http://localhost:5173/oauth/kakao";
  const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(
    redirectUri
  )}&response_type=code`;
  res.redirect(kakaoAuthUrl);
}

/**
 * 구글 로그인: 구글 OAuth2.0 URL로 리다이렉트
 */
export const googleLogin = async (req: Request, res: Response): Promise<void> => {
  const clientId = env.GOOGLE_CLIENT_ID as string;
  const redirectUri =
    env.GOOGLE_REDIRECT_URI ||
    "http://localhost:5173/oauth/google";
  const scope = "email profile";
  const state = generateRandomState();
  const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(
    redirectUri
  )}&scope=${encodeURIComponent(scope)}&state=${state}`;
  res.redirect(googleAuthUrl);
}

/**
 * 애플 로그인: 애플 OAuth2.0 URL로 리다이렉트
 */
export const appleLogin = async (req: Request, res: Response): Promise<void> => {
  const clientId = env.APPLE_CLIENT_ID as string;
  const redirectUri =
    env.APPLE_REDIRECT_URI ||
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
  res.redirect(appleAuthUrl);
}

/** 
 * 데이터 저장 및 로그인
*/
const oauthLogin = async (profileData: any, agent: string, res: Response): Promise<void> => {
  try {
    const { email, name } = profileData.response;
    debugger;
    console.log(`email : ${email}`);
    console.log(`name : ${name}`);
    // 기존 유저 조회
    let existingUser = await findUserByEmail(email, agent);
    if (!existingUser) {
      await createUser(name, email, agent);
      existingUser = await findUserByEmail(email, agent);
    }
    console.log(`existingUser : ${existingUser}`);
    if (!existingUser) {
      res.status(400).json({ message: "오류가 발생하였습니다." });
      return;
    }
    const uuid = existingUser.uuid;
    const token = jwt.sign({ uuid: uuid }, JWT_SECRET, { expiresIn: "1h" });
    console.log(`uuid : ${uuid}`);
    console.log(`token : ${token}`);
    await authUser(uuid, token);

    // 클라이언트에 응답
    res.cookie('authToken', token, { secure: true, sameSite: 'strict' });
    res.redirect(env.FRONTEND_URL+'/oauth-result?status=success');
  } catch (error) {
    console.error('Error during user login:', error);
    res.redirect(env.FRONTEND_URL+'/oauth-result?status=fail');
  }
};