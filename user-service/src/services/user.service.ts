import bcrypt from "bcrypt";
import {
  insertUser,
  CreateUserInput,
  findUserByEmail,
} from "../repositories/user.repository";
import { AppError } from "../utils/AppError";

export const createUserService = async (user: CreateUserInput) => {
  const is_exist_user = await findUserByEmail(user.email);
  if (is_exist_user) throw new AppError("Email Already Registered.", 409);

  // hashing password
  const hashedPassword = await bcrypt.hash(user.password_hash, 10);

  const values = [user.email, hashedPassword, user.first_name, user.last_name];

  const result = await insertUser(values);

  return result.rows[0];
};
