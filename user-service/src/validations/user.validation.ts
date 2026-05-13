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
