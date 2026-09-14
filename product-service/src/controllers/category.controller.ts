import { Request, Response } from "express";
import { apiResponse } from "../utils/apiResponse";
import { categorySchema } from "../validations/category.validation";
import { validationFirstErrorMessage } from "../utils/validationFirstErrorMessage";
import { categoryService } from "../services/category.service";
import { createSlug } from "../utils/createSlug";

const createCategory = async (req: Request, res: Response) => {
  const validation = categorySchema.safeParse(req.body);
  if (!validation.success) return validationFirstErrorMessage(validation.error);

  const payload = {
    ...validation.data,
    created_by: req.user!.user_id,
    slug: createSlug(validation.data.category_name),
  };

  const result = await categoryService(payload);
  return res
    .status(200)
    .json(apiResponse(true, `Category Successfully added.`, result));
};
