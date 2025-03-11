import { selectInfo } from "@models/userInfoModel";
import { Request, Response } from "express";

export const selectUserInfo = async (req: Request, res: Response): Promise<void> => {
  try {
    const uuid = (req as any).user?.uuid;
    console.log(uuid);
    const info = await selectInfo(uuid);
    res.json({ info });
  } catch (error) {
    console.error("조회 오류:", error);
    res.status(500).json({ message: "서버 오류 발생" });
  }
};