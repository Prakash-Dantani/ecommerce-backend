import bcrypt from "bcrypt";
import {
  insertUser,
  CreateUserInput,
  findUserByEmail,
  findUserById,
} from "../repositories/user.repository";
import { AppError } from "../utils/AppError";
import jwt from "jsonwebtoken";
import { findRefreshToken } from "../repositories/refreshToken.repository";
import { generateAccessToken } from "../utils/token.util";

export const createUserService = async (user: CreateUserInput) => {
  const is_exist_user = await findUserByEmail(user.email);
  if (is_exist_user) throw new AppError("Email Already Registered.", 409);

  // hashing password
  const hashedPassword = await bcrypt.hash(user.password_hash, 10);

  const values = [user.email, hashedPassword, user.first_name, user.last_name];

  const result = await insertUser(values);

  return result.rows[0];
};

export const refreshAccessTokenService = async (refresh_tokens: string) => {
  if (!process.env.JWT_REFRESH_SECRET)
    throw new AppError("Refresh secret not configured", 500);

  let decoded: any;
  try {
    decoded = jwt.verify(refresh_tokens, process.env.JWT_REFRESH_SECRET);
  } catch {
    throw new AppError("Invalid or expired refresh token", 401);
  }

  const storedRefreshToken = await findRefreshToken(refresh_tokens);

  if (!storedRefreshToken) {
    throw new AppError("Refresh token not found or revoked", 401);
  }

  if (new Date(storedRefreshToken.expires_at) < new Date()) {
    throw new AppError("Refresh token expired", 401);
  }

  const user = await findUserById(decoded.user_id);
  if (!user) throw new AppError("User not found", 404);

  const newAccessToken = generateAccessToken({
    user_id: user.user_id,
    email: user.email,
    role: user.role,
  });

  return {
    accessToken: newAccessToken,
  };
};
