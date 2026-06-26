import { findUserByEmail } from "../repositories/user.repository";
import { AppError } from "../utils/AppError";
import bcrypt from "bcrypt";
import { generateAccessToken, generateRefreshToken } from "../utils/token.util";
import {
  findRefreshToken,
  revokeRefreshToken,
  saveRefreshToken,
} from "../repositories/refreshToken.repository";
import { apiResponse } from "../utils/apiResponse";

export const loginUserService = async (email: string, password: string) => {
  const user = await findUserByEmail(email);

  if (!user) throw new AppError("Invalid Credentials, or User Not Exist.", 401);

  const isMatch = await bcrypt.compare(password, user.password_hash);

  if (!isMatch) throw new AppError("Invalid Credentials.", 401);

  const accessToken = generateAccessToken({
    user_id: user.user_id,
    email: user.email,
    role: user.role,
  });
  // intilize json web token

  const refreshToken = generateRefreshToken(user.user_id);

  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 7);

  await saveRefreshToken(user.user_id, refreshToken, expiresAt);

  return { user_id: user.id, email: user.email, accessToken, refreshToken };
};

export const logoutUserService = async (refresh_tokens: string) => {
  const storedRefreshToken = findRefreshToken(refresh_tokens);
  if (!refresh_tokens)
    throw new AppError("Refresh token not found or already revoked", 401);

  await revokeRefreshToken(refresh_tokens);
  return true;
};
