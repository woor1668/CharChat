import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { findUserByEmail, createUser, loginUser, authUser } from "@models/userModel";

const JWT_SECRET = process.env.JWT_SECRET || "default_secret";

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, id, pw } = req.body;   

    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      res.status(400).json({ message: "이미 가입된 이메일입니다." });
      return;
    }

    await createUser(name, id, email, pw);

    res.status(201).json({ message: "회원가입 성공" });
  } catch (error) {
    console.error("회원가입 오류:", error);
    res.status(500).json({ message: "서버 오류 발생" });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { eid, pw } = req.body;

    const user = await loginUser(eid, pw);
    if (!user) {
      res.status(400).json({ message: "존재하지 않는 계정입니다." });
      return;
    }
    const uuid = user.uuid;
    const lang = user.lang;
    const token = jwt.sign({ uuid: uuid }, JWT_SECRET, { expiresIn: "1h" });
    await authUser(uuid, token);
    res.json({ token, lang });
  } catch (error) {
    console.error("로그인 오류:", error);
    res.status(500).json({ message: "서버 오류 발생" });
  }
};

export const auth = async (req: Request, res: Response): Promise<void> => {
  res.status(200).json({ message: "정상 토큰" });
};