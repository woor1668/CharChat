import { getUuid } from "@middlewares/authMiddleware";
import { selectMyInfo, updateMyInfo } from "@controllers/myPage/myInfoController";
import express from "express";

const myInfoRouter = express.Router();

myInfoRouter.post("/selectInfo", getUuid, selectMyInfo);
myInfoRouter.post('/updateInfo', getUuid, updateMyInfo);
// myInfoRouter.post("/toggleChange", getUuid, toggleChange);
export default myInfoRouter;