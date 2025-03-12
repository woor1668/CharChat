import { getUuid } from "@middlewares/authMiddleware";
import { selectMyInfo, updateMyInfo, upsertMyProfile } from "@controllers/myPage/myInfoController";
import express from "express";

const myInfoRouter = express.Router();

myInfoRouter.post("/selectMyInfo", getUuid, selectMyInfo);
myInfoRouter.post("/upsertMyProfile", getUuid, upsertMyProfile);
myInfoRouter.post('/updateMyInfo', getUuid, updateMyInfo);
// myInfoRouter.post("/toggleChange", getUuid, toggleChange);
export default myInfoRouter;