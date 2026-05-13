import z from "zod";

export const optionalCleanStringValidator = (field_name: string) => {
  return z.preprocess(
    (val) => {
      if (val === null || val === "") return undefined;

      if (typeof val === "string" && val.trim() === "") return undefined;

      return val;
    },

    z
      .string()
      .trim()
      .min(2, `${field_name} must be at least 2 characters`)
      .regex(/^[A-Za-z]+(?: [A-Za-z]+)*$/, {
        message: `Invalid ${field_name} format`,
      })
      .optional(),
  );
};

export const emailValidator = () =>
  z.string().trim().toLowerCase().email({
    message: "Invalid email format",
  });

export const passwordValidator = () =>
  z
    .string()
    .min(8, {
      message: "Password must be at least 8 characters",
    })
    .max(16, {
      message: "Password must not exceed 16 characters",
    })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/, {
      message:
        "Password must contain uppercase, lowercase, number, and special character",
    });

export const requiredTextValidator = (fieldName: string, min = 2, max = 100) =>
  z
    .string()
    .trim()
    .min(min, {
      message: `${fieldName} must be at least ${min} characters`,
    })
    .max(max, {
      message: `${fieldName} must not exceed ${max} characters`,
    });
