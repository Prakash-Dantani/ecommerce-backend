import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { apiResponse } from "../utils/apiResponse";
import {
  categoryList,
  createCategory,
  searchBy,
  searchById,
  searchByName,
  searchBySlug,
} from "../controllers/category.controller";
import { findAllCategoryService } from "../services/category.service";

const categoryRouter = Router();
categoryRouter.use(authMiddleware);

categoryRouter.get("/", categoryList);
categoryRouter.post("/", createCategory);
categoryRouter.get("/slug", searchBySlug);
categoryRouter.get("/name", searchByName);
categoryRouter.get("/:id", searchById);
categoryRouter.get("/:by/:value", searchBy);

//   (req, res) => {
//   return res
//     .status(200)
//     .json(apiResponse(true, "Category Successfully Added", []));
// });

export default categoryRouter;
