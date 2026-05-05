import pool from "../config/db";

export type CreateUserInput = {
  email: string;
  password_hash: string;
  first_name?: string;
  last_name?: string;
};

export const insertUser = async (values: any[]) => {
  const query = `INSERT INTO auth.users(email, password_hash,first_name, last_name) VALUES 
    ($1, $2, $3, $4) RETURNING user_id, email`;

  return await pool.query(query, values);
};

export const createUserService = async (user: CreateUserInput) => {
  const values = [
    user.email,
    user.password_hash,
    user.first_name,
    user.last_name,
  ];

  const result = await insertUser(values);
};
