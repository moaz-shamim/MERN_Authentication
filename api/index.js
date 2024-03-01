import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoutes from "./routes/user.routes.js";
import authRoutes from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
import path from 'path';
dotenv.config({ path: "./.env" });

const __dirname = path.resolve();


const app = express();

app.use(express.static(path.join(__dirname, '/frontend/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'));
});

app.use(express.json());

app.use(cookieParser());

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
