import jwt from "jsonwebtoken";
import { JwtPayload } from "../types/auth.types";

export const generateAccessToken = (payload: JwtPayload) => {
  return jwt.sign(payload, process.env.JWT_SECRET as string, {
    // expiresIn: process.env.JWT_EXPIRES_IN as any,
    expiresIn: "1h",
  });
};

export const generateRefreshToken = (user_id: number) => {
  return jwt.sign({ user_id }, process.env.JWT_REFRESH_SECRET as string, {
    // expiresIn: process.env.JWT_REFRESH_EXPIRES_IN as any,
    expiresIn: "7d",
  });
};
