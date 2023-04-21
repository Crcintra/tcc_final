import { createHoleriteService } from "./../services/Holerites/createHolerite.service";
import { Request, Response } from "express";

export const createHoleriteController = async (req: Request, res: Response) => {
  const data = req.body;

  const newHolerite = await createHoleriteService(data);

  return res.status(201).json(newHolerite);
};
