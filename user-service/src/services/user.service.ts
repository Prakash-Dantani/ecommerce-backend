import bcrypt from "bcrypt";
import {
  insertUser,
  CreateUserInput,
  findUserByEmail,
} from "../repositories/user.repository";
import jwt from "jsonwebtoken";

export const createUserService = async (user: CreateUserInput) => {
  const is_exist_user = await findUserByEmail(user.email);
  if (is_exist_user) throw new Error("EMAIL_ALREADY_EXISTS");

  // hashing password
  const hashedPassword = await bcrypt.hash(user.password_hash, 10);

  const values = [user.email, hashedPassword, user.first_name, user.last_name];

  const result = await insertUser(values);

  return result.rows[0];
};

export const loginUserService = async (email: string, password: string) => {
  const user = await findUserByEmail(email);

  if (!user) throw new Error("Invalid Credentials, or User Not Exist.");

  const isMatch = await bcrypt.compare(password, user.password_hash);

  if (!isMatch) throw new Error("Invalid Credentials.");

  // intilize json web token
  const token = jwt.sign(
    { user_id: user.user_id, email: user.email },
    process.env.JWT_SECRET as string,
    { expiresIn: "1H" },
  );

  return { user_id: user.id, email: user.email, token };
};
