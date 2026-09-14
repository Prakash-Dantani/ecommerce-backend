import { error } from "console";
import dotenv from "dotenv";
import express from "express";
import errorMiddleware from "./middlewares/errorMiddleware";
import { authMiddleware } from "./middlewares/auth.middleware";
import { apiResponse } from "./utils/apiResponse";
import categoryRouter from "./routes/category.routes";
const app = express();

dotenv.config();
app.use(express.json());

app.get("/health", (req, res) => {
  console.log("Product service is running.");
  return res.status(200).json({ message: "Product service is running." });
});

app.use("/api/category", categoryRouter);
// Using Centerlized Error Middleware
app.use(errorMiddleware);

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Product Service Listening on http://localhost:${PORT}`);
});
