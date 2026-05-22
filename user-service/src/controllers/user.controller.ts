import { NextFunction, Request, Response } from "express";
import { createUserService, loginUserService } from "../services/user.service";
import {
  loginUserSchema,
  registerUserSchema,
} from "../validations/user.validation";
import { success } from "zod";
import { aysncHandler } from "../utils/asyncHandler";
import { AppError } from "../utils/appError";

// User Registration Code start
export const registerUser = aysncHandler(
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
      .json({ message: "User Successfully Registered.", data: user });
  },
);

// Login Code Start
export const loginUser = aysncHandler(async (req: Request, res: Response) => {
  const validation = loginUserSchema.safeParse(req.body);
  const { email, password } = req.body;
  if (!validation.success) {
    throw new AppError(validation.error.message, 400);
  }

  const userData = await loginUserService(email, password);
  return res.status(200).json({ message: "Login Successfull", userData });
});
