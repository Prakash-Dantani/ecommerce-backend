import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { refreshTokenSchema } from "../validations/user.validation";
import { AppError } from "../utils/AppError";
import { refreshAccessTokenService } from "../services/user.service";
import { apiResponse } from "../utils/apiResponse";

export const refreshAccessToken = asyncHandler(
  async (req: Request, res: Response) => {
    const validation = refreshTokenSchema.safeParse(req.body);

    if (!validation.success)
      throw new AppError(
        validation.error.issues[0]?.message || "Validation failed",
        400,
      );

    const { refreshToken } = validation.data;

    const tokenData = await refreshAccessTokenService(refreshToken);

    return res
      .status(200)
      .json(
        apiResponse(true, "Access token refreshed successfully", tokenData),
      );
  },
);
