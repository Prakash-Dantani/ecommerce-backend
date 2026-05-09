import { Router, Response, Request } from "express";
import { loginUser, registerUser } from "../controllers/user.controller";
import { authMiddleware, AuthRequest } from "../middlewares/auth.middleware";

const userRoutes = Router();

userRoutes.post("/register", registerUser);
userRoutes.post("/login", loginUser);

userRoutes.get(
  "/profile",
  authMiddleware,
  (req: AuthRequest, res: Response) => {
    res.json({
      message: "Protected route accessed",
      user: req.user,
    });
  },
);

export default userRoutes;
