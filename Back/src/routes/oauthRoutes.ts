import express from "express";
import { authenticateJWT } from "@middlewares/authMiddleware";
import { appleLogin, googleLogin, kakaoLogin, naverCallBack, naverLogin } from "@controllers/oauthController";

const oauthRouter = express.Router();

oauthRouter.get("/naver", naverLogin);
oauthRouter.get("/naverCallBack", naverCallBack);
oauthRouter.get("/kakao", kakaoLogin);
oauthRouter.get("/google", googleLogin);
oauthRouter.get("/apple", appleLogin);
export default oauthRouter;
