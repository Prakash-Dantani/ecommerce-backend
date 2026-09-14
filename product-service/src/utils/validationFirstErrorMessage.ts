import { ZodError } from "zod";
import { AppError } from "./AppError";

export const validationFirstErrorMessage = (error: ZodError) => {
  const firstError = error.issues[0]?.message || "Validation failed";
  throw new AppError(firstError || "Validation Failed.", 400);
};
