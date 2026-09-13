import express from "express";
const app = express();

app.get("/health", (req, res) => {
  console.log("Product service is running.");
  return res.status(200).json({ message: "Product service is running." });
});

const PORT = process.env.PORT || 1122;
app.listen(PORT, () => {
  console.log(`Product Service Listening on http://localhost:${PORT}`);
});
