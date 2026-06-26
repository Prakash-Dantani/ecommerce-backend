import { Router, Response, Request } from "express";
import { registerUser } from "../controllers/user.controller";
import { authMiddleware, AuthRequest } from "../middlewares/auth.middleware";
import { asyncHandler } from "../utils/asyncHandler";
import { apiResponse } from "../utils/apiResponse";
import { authorize } from "../middlewares/authorize.middleware";
import {
  loginUser,
  logoutUser,
  refreshAccessToken,
} from "../controllers/auth.controller";

const userRoutes = Router();

userRoutes.post("/register", registerUser);
userRoutes.post("/login", loginUser);

userRoutes.get(
  "/profile",
  authMiddleware,
  asyncHandler(async (req: AuthRequest, res: Response) => {
    return res.json(
      apiResponse(true, "User Profile Successfully viewed", req.user),
    );
  }),
);

userRoutes.get(
  "/admin-dashboard",
  authMiddleware,
  authorize("ADMIN"),
  asyncHandler(async (req: AuthRequest, res: Response) => {
    return res.status(200).json(apiResponse(true, "Welcome Admin", req.user));
  }),
);

userRoutes.post("/refresh-token", refreshAccessToken);

userRoutes.post("/logout", logoutUser);

export default userRoutes;
