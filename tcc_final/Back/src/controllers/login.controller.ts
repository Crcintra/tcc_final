import { Request, Response } from "express";
import { loginService } from "../services/Login/login.service";

export const loginController = async (req: Request, res: Response) => {
  const body = req.body;

  const token = await loginService(body);

  return res.json(token);
};
