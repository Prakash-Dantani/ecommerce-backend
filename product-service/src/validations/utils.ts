import z from "zod";

export const requiredTextValidator = (
  fieldName: string,
  min = 2,
  max = 255,
) => {
  z.string()
    .trim()
    .min(min, {
      message: `${fieldName} must be at least ${min} characters`,
    })
    .max(max, { message: `${fieldName} must not exceed ${max} characters` });
};

export const opetionalPositiveNumber = (fieldName: string, minVal = 1) => {
  z.number().positive().nullable();
};
