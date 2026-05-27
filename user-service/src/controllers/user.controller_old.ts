import { NextFunction, Request, Response } from "express";
import { createUserService } from "../services/user.service";
import { registerUserSchema } from "../validations/user.validation";
import { success } from "zod";
import { loginUserService } from "../services/login.service";

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const validation = registerUserSchema.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).json({
        success: false,
        errors: validation.error.flatten().fieldErrors,
      });
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
  } catch (error: any) {
    return next(error);
  }
};

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required." });
    }

    const userData = await loginUserService(email, password);
    return res.status(200).json({ message: "Login Successfull", userData });
  } catch (error: any) {
    return next(error);
  }
};
