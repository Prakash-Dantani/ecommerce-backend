import { z } from "zod";
import {
  emailValidator,
  optionalCleanStringValidator,
  passwordValidator,
} from "./utils";

export const registerUserSchema = z.object({
  email: emailValidator(),
  password: passwordValidator(),
  first_name: optionalCleanStringValidator("First name"),
  last_name: optionalCleanStringValidator("Last name"),
});

export const loginUserSchema = z.object({
  email: emailValidator(),
  password: passwordValidator(),
});

export const refreshTokenSchema = z.object({
  refreshToken: z.string().min(1, {
    message: "Refresh token is required",
  }),
});
