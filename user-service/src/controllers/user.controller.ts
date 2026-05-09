import { Request, Response } from "express";
import { createUserService, loginUserService } from "../services/user.service";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { email, password, first_name, last_name } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and PAssword are required." });
    }

    const user = await createUserService({
      email,
      password_hash: password,
      first_name,
      last_name,
    });

    return res
      .status(200)
      .json({ message: "User Successfully Registered.", data: user });
  } catch (error: any) {
    console.error("Register error:", error.message);

    // Handle duplicate email
    if (error.code === "23505") {
      return res.status(409).json({
        message: "Email already exists",
      });
    }

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required." });
    }

    const userData = await loginUserService(email, password);
    return res.status(200).json({ message: "Login Successfull", userData });
  } catch (error: any) {
    return res
      .status(401)
      .json({ message: error.message || "Invalid Credential" });
  }
};
