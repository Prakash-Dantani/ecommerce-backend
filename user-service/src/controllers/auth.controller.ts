import { Request, response, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import {
  loginUserSchema,
  refreshTokenSchema,
} from "../validations/user.validation";
import { AppError } from "../utils/AppError";
import { refreshAccessTokenService } from "../services/user.service";
import { apiResponse } from "../utils/apiResponse";
import { loginUserService, logoutUserService } from "../services/login.service";
import { throwValidationFirstError } from "../utils/validation.utils";

export const refreshAccessToken = asyncHandler(
  async (req: Request, res: Response) => {
    const validation = refreshTokenSchema.safeParse(req.body);

    if (!validation.success) throwValidationFirstError(validation.error, 401);

    const { refreshToken } = validation.data!;

    const tokenData = await refreshAccessTokenService(refreshToken);

    return res
      .status(200)
      .json(
        apiResponse(true, "Access token refreshed successfully", tokenData),
      );
  },
);

// Login Code Start
export const loginUser = asyncHandler(async (req: Request, res: Response) => {
  const validation = loginUserSchema.safeParse(req.body);
  if (!validation.success)
    if (!validation.success) throwValidationFirstError(validation.error, 401);

  const { email, password } = validation.data!;

  const userData = await loginUserService(email, password);
  return res.status(200).json(apiResponse(true, "Login Successfull", userData));
});

// Logout code start
export const logoutUser = async (req: Request, res: Response) => {
  const validation = refreshTokenSchema.safeParse(req.body);
  if (!validation.success) throwValidationFirstError(validation.error, 401);

  const { refreshToken } = validation.data!;

  await logoutUserService(refreshToken);
  return res.status(200).json(apiResponse(true, "Logout successful", null));
};
