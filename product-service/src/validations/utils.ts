import z from "zod";

export const requiredTextValidator = (
  fieldName: string,
  min = 2,
  max = 255,
) => {
  return z
    .string()
    .trim()
    .min(min, {
      message: `${fieldName} must be at least ${min} characters`,
    })
    .max(max, { message: `${fieldName} must not exceed ${max} characters` });
};

export const optionalPositiveNumber = (fieldName: string, minVal = 1) => {
  return z.number().positive().nullable();
};

export const optionaltextValidator = (field_name: string) => {
  return z.string().optional();
};

export const urlValidator = () => {
  return z.url().nullable();
};
