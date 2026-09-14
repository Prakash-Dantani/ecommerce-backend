import { Request, Response } from "express";
import {
  findCategory,
  insertCategory,
} from "../repositories/category.repository";
import { categoryType } from "../types/category.type";
import { AppError } from "../utils/AppError";

import { createSlug } from "../utils/createSlug";

export const categoryService = async (category: categoryType) => {
  const isCategoryExist = await findCategory(category.category_name);
  if (isCategoryExist) throw new AppError("Category already exist", 409);

  category = {
    ...category,
  };
  const result = await insertCategory(category);
  return result.rows[0];
};

// export const findCategory = (category_name: string) => {

// };
