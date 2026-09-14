import pool from "../config/db";
import { categoryType } from "../types/category.type";
import { createSlug } from "../utils/createSlug";

export const insertCategory = async (category: categoryType) => {
  const query = `INSERT INTO catalog.categories(parent_category_id, category_name, slug, description, 
                    image_url, sort_order,is_active, created_by) 
                    VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING category_name`;
  const values = [
    category.parent_category_id,
    category.category_name,
    category.slug,
    category.description,
    category.image_url,
    category.sort_order,
    category.is_active,
    category.created_by,
  ];
  return await pool.query(query, values);
};

export const findCategory = async (category_name: string) => {
  const query = `SELECT category_id, parent_category_id, category_name, slug, description, 
                    image_url, sort_order,is_active, created_by FROM catalog.categories WHERE category_name=$1`;
  const result = await pool.query(query, [category_name]);
  return result;
};
