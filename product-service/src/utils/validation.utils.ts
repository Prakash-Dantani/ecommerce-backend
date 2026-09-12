import { ZodError } from "zod";
import { AppError } from "../utils/AppError";

export const throwValidationFirstError = (
  validation: ZodError,
  errorCode = 400,
  message = "Validation Failed",
): never => {
  const error = validation.issues[0]?.message || message;
  throw new AppError(error, errorCode);
};
