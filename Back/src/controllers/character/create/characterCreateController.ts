import { selectStep } from "@models/character/create/characterCreateModel";
import { Request, Response } from "express";


export const getStep = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log('11');
    const steps = await selectStep();
    console.log('22');

    res.json({ steps });
  } catch (error) {
    console.error("조회 오류:", error);
    res.status(500).json({ message: "서버 오류 발생" });
  }
};