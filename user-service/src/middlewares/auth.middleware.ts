import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JwtPayload } from "../types/auth.types";
import { AppError } from "../utils/appError";

export interface AuthRequest extends Request {
  user?: JwtPayload;
}

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader)
      return next(new AppError("Authorizqation Token missing", 401));

    if (!authHeader.startsWith("Bearer ")) {
      return next(new AppError("Invalid authorization format", 401));
    }

    if (!process.env.JWT_SECRET) {
      return next(new AppError("JWT secret not configured", 500));
    }

    const token = authHeader?.split(" ")[1];

    if (!token) return next(new AppError("Invalid token format", 401));

    const decode = jwt.verify(
      token as string,
      process.env.JWT_SECRET as string,
    ) as JwtPayload;

    req.user = decode;
    return next();
  } catch (error: any) {
    return next(new AppError("Invalid OR Expired token", 401));
  }
};
