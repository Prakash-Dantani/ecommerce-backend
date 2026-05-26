import { Router, Response, Request } from "express";
import { loginUser, registerUser } from "../controllers/user.controller";
import { authMiddleware, AuthRequest } from "../middlewares/auth.middleware";
import { asyncHandler } from "../utils/asyncHandler";
import { apiResponse } from "../utils/apiResponse";

const userRoutes = Router();

userRoutes.post("/register", registerUser);
userRoutes.post("/login", loginUser);

userRoutes.get(
  "/profile",
  authMiddleware,
  asyncHandler(async (req: AuthRequest, res: Response) => {
    return res.json(apiResponse(true, "Protected route accessed", req.user));
  }),
);

export default userRoutes;
