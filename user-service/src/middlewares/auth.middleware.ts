import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
  user?: {
    user_id: number;
    email: string;
  };
}

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader)
      res.status(401).json({ message: "Authorizqation Token missing" });

    const token = authHeader?.split(" ")[1];

    if (!token) res.status(401).json({ message: "Invalid token format" });

    const decode = jwt.verify(
      token as string,
      process.env.JWT_SECRET as string,
    ) as { user_id: number; email: string };

    req.user = decode;
    next();
  } catch (error: any) {
    res.status(401).json({ message: "Invalid OR Expired token" });
  }
};
