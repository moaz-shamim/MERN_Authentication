import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoutes from "./routes/user.routes.js";
import authRoutes from "./routes/auth.routes.js";
dotenv.config({ path: "./.env" });

const app = express();
app.use(express.json());

mongoose
  .connect(process.env.MONGO_DB_URI)
  .then(() => {
    console.log("connected to DataBase");
  })
  .catch((error) => {
    console.log(error);
  });

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);

app.use((error, request, response, next) => {
  const statusCode = error.statusCode || 500;
  const message = error.message || "internal Server Error";
  return response.status(statusCode).json({
    success: false,
    message,
    statusCode,
  });
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server listning on PORT:3000!");
});
