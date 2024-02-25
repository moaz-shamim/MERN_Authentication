import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
const app = express();

dotenv.config({ path: "./.env" });

mongoose
  .connect(process.env.MONGO_DB_URI)
  .then(() => {
    console.log("connected to DataBase");
  })
  .catch((error) => {
    console.log(error);
  });

app.listen(process.env.PORT || 3000, () => {
  console.log("Server listning on PORT:3000!");
});
