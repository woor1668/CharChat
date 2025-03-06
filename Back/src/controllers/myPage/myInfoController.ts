import { selectInfo, updateInfo } from "@models/myPage/myInfoModel";
import { Request, Response } from "express";

export const selectMyInfo = async (req: Request, res: Response): Promise<void> => {
  try {
    const uuid = (req as any).user?.uuid;
    const info = await selectInfo(uuid);

    res.json({ info });
  } catch (error) {
    console.error("조회 오류:", error);
    res.status(500).json({ message: "서버 오류 발생" });
  }
};

export const updateMyInfo = async (req: Request, res: Response): Promise<void> => {
  try {
    const { lang, isPw, pw } = req.body;   
    const uuid = (req as any).user?.uuid;

    await updateInfo(uuid, lang, isPw, pw);

    res.status(201).json({ message: "저장 성공" });
  } catch (error) {
    console.error("저장 오류:", error);
    res.status(500).json({ message: "서버 오류 발생" });
  }
};