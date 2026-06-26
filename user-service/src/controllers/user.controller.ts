import { Request, Response } from "express";
import { createUserService } from "../services/user.service";
import {
  loginUserSchema,
  registerUserSchema,
} from "../validations/user.validation";
import { success } from "zod";
import { asyncHandler } from "../utils/asyncHandler";
import { AppError } from "../utils/AppError";
import { apiResponse } from "../utils/apiResponse";
import { loginUserService } from "../services/login.service";

// User Registration Code start
export const registerUser = asyncHandler(
  async (req: Request, res: Response) => {
    const validation = registerUserSchema.safeParse(req.body);

    if (!validation.success) {
      const firstError =
        validation.error.issues[0]?.message || "Validation failed";
      throw new AppError(firstError || "Validation Failed.", 400);
    }

    const { email, password, first_name, last_name } = validation.data;

    const user = await createUserService({
      email: email,
      password_hash: password,
      first_name: first_name,
      last_name: last_name,
    });

    return res
      .status(200)
      .json(apiResponse(true, "User Successfully Registered.", user));
  },
);
