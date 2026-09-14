import pool from "../config/db";
import { categoryType } from "../types/category.type";
import { createSlug } from "../utils/createSlug";

export const findAllCategory = async () => {
  const query = `SELECT * FROM catalog.categories`;
  const result = await pool.query(query, []);
  return result;
};

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
  const result = await pool.query(query, values);
  return result;
};

export const findCategoryByName = async (category_name: string) => {
  const query = `SELECT category_id, parent_category_id, category_name, slug, description, 
                    image_url, sort_order,is_active, created_by FROM catalog.categories WHERE category_name=$1`;
  const result = await pool.query(query, [category_name]);
  return result.rows;
};

export const findCategoryBySlug = async (slug: string) => {
  const query = `SELECT category_id, parent_category_id, category_name, slug, description, 
                    image_url, sort_order,is_active, created_by FROM catalog.categories WHERE slug ILIKE '%' || $1 || '%'`;
  console.log(query);
  const result = await pool.query(query, [slug]);
  return result.rows;
};

export const findCategoryById = async (id: number) => {
  const query = `SELECT category_id, parent_category_id, category_name, slug, description, 
                    image_url, sort_order,is_active, created_by FROM catalog.categories WHERE category_id = $1`;
  const result = await pool.query(query, [id]);
  return result.rows;
};
