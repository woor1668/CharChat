import express from "express";
import { authenticateJWT } from "@middlewares/authMiddleware";
import { selectUserInfo } from "@controllers/userInfoController";

const useInfoRouter = express.Router();

useInfoRouter.post("/selectInfo", authenticateJWT, selectUserInfo);
export default useInfoRouter;