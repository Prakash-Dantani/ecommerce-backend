import express from "express";
import dotenv from "dotenv";
import "./config/db";
import userRoutes from "./routes/user.routes";
import { errorMiddleware } from "./middlewares/error.middleware";

dotenv.config();

const app = express();
app.use(express.json());

app.get("/health", (req, res) => {
  res.status(200).json({ status: "User Service Running" });
});

// user service route add
app.use("/api/users", userRoutes);

// Centerlized Error Middleware
app.use(errorMiddleware);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`User Service running on http://localhost:${PORT}/health`);
});
