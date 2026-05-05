import express from "express";
import dotenv from "dotenv";
import "./config/db";

dotenv.config();

const app = express();
app.use(express.json());

app.get("/health", (req, res) => {
  res.status(200).json({ status: "User Service Running" });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`User Service running on http://localhost:${PORT}/health`);
});
