import { Request, Response } from "express";
import { apiResponse } from "../utils/apiResponse";
import { categorySchema } from "../validations/category.validation";
import { validationFirstErrorMessage } from "../utils/validationFirstErrorMessage";
import {
  categoryService,
  findAllCategoryService,
  findCategoryBy,
} from "../services/category.service";
import { createSlug } from "../utils/createSlug";
import { asyncHandler } from "../utils/asyncHandler";
import {
  findAllCategory,
  findCategoryById,
  findCategoryByName,
  findCategoryBySlug,
} from "../repositories/category.repository";

export const createCategory = asyncHandler(
  async (req: Request, res: Response) => {
    const validation = categorySchema.safeParse(req.body);
    if (!validation.success)
      return validationFirstErrorMessage(validation.error);

    const payload = {
      ...validation.data,
      created_by: req.user!.user_id,
      slug: createSlug(validation.data.category_name),
    };

    const result = await categoryService(payload);
    return res
      .status(200)
      .json(apiResponse(true, `Category Successfully added.`, result));
  },
);

export const categoryList = asyncHandler(
  async (req: Request, res: Response) => {
    const categories = await findAllCategoryService();
    return res
      .status(200)
      .json(apiResponse(true, "Category list successfully view.", categories));
  },
);

export const searchBySlug = asyncHandler(
  async (req: Request, res: Response) => {
    const slug = createSlug(req.body.slug);
    const categories = await findCategoryBySlug(slug);

    return res
      .status(200)
      .json(apiResponse(true, "Category list successfully view.", categories));
  },
);

export const searchByName = asyncHandler(
  async (req: Request, res: Response) => {
    const categories = await findCategoryByName(req.body.name);

    return res
      .status(200)
      .json(apiResponse(true, "Category list successfully view.", categories));
  },
);

export const searchById = asyncHandler(async (req: Request, res: Response) => {
  const category_id = Number(req.params.id);
  const category = await findCategoryById(category_id);

  return res
    .status(200)
    .json(apiResponse(true, "Category successfully view.", category));
});

export const searchBy = asyncHandler(async (req: Request, res: Response) => {
  const category = await findCategoryBy(req);

  return res
    .status(200)
    .json(apiResponse(true, "Category successfully view.", category));
});
