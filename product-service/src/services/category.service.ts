import { Request, Response } from "express";
import {
  findAllCategory,
  findCategoryById,
  findCategoryByName,
  findCategoryBySlug,
  insertCategory,
} from "../repositories/category.repository";
import { categoryType } from "../types/category.type";
import { AppError } from "../utils/AppError";

export const categoryService = async (category: categoryType) => {
  const isCategoryExist = await findCategoryByName(category.category_name);
  if (isCategoryExist) throw new AppError("Category already exist", 409);

  category = {
    ...category,
  };
  const result = await insertCategory(category);
  return result.rows[0];
};

export const findAllCategoryService = async () => {
  const result = await findAllCategory();
  return result.rows;
};

export const findCategoryBy = async (req: Request) => {
  var result;
  if (req.params.by === "name")
    result = await findCategoryByName(String(req.params.value));

  if (req.params.by === "slug")
    result = await findCategoryBySlug(String(req.params.value));

  if (req.params.by === "id")
    result = await findCategoryById(Number(req.params.value));

  return result?.rows;
};
