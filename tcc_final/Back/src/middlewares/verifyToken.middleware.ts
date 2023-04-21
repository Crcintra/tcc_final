import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors";
import * as jwt from "jsonwebtoken";

export const verifyTokenMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token = req.headers.authorization;
  if (!token) {
    throw new AppError("Missing bearer token", 401);
  }
  token = token.split(" ")[1];

  jwt.verify(token, process.env.SECRET_KEY!, (error, decoded: any) => {
    if (error) {
      throw new AppError(error.message, 401);
    }

    req.user = {
      isRh: decoded.isRh,
      id: decoded.id,
    };
  });

  return next();
};
