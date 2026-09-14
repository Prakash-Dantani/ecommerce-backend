import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { apiResponse } from "../utils/apiResponse";

const categoryRouter = Router();
categoryRouter.use(authMiddleware);

categoryRouter.post("/category", (req, res) => {
  return res
    .status(200)
    .json(apiResponse(true, "Category Successfully Added", []));
});

export default categoryRouter;
