import { NextFunction, Request, Response } from "express";
import { AuthRequest } from "./auth.middleware";
import { AppError } from "../utils/AppError";

export const authorize =
  (...allowedRoles: string[]) =>
  (req: AuthRequest, res: Response, next: NextFunction) => {
    console.log(allowedRoles);
    if (!req.user) return next(new AppError("Unauthorized access", 401)); // No login / invalid token.

    if (!allowedRoles.includes(req.user.role))
      return next(new AppError("Forbidden Access", 403)); // No permission even if authorized(Login)

    return next();
  };
