import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(
    cors({
      origin: "http://localhost:3000",

    })
  );

app.use(express.static("images"));
async function startServer() {
    mongoose.connection.once("open", () => {
      console.log("mongo is ready");
    });
  
    mongoose.connection.on("error", (err) => {
      console.error(err);
    });
    await mongoose.connect(process.env.MONGO_URL);
  
    app.listen(process.env.PORT, () => {
      console.log("listening on port: " + process.env.PORT);
    });
  }
  
  startServer();