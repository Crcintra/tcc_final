import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors";

export const isRhMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { isRh } = req.user;

  if (!isRh) {
    throw new AppError("Insufficient permission", 403);
  }

  return next();
};
