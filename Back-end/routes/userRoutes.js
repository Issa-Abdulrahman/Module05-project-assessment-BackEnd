import express from "express";
import {
  signup,
  login,
  logout,
  getAll,
  getOne,
  updateUser,
  deleteUser,
  gsignup,
} from "../controllers/userController.js";
import upload from "../middlewares/multer.js";
import { authorized } from "../middlewares/authorization.js";

export const userRouter = express.Router();

userRouter.post("/signup", signup);
userRouter.post("/gsignup", gsignup);

userRouter.post("/login", login);

userRouter.get("/getone", getOne);
userRouter.get("/logout", authorized, logout);
userRouter.get("/getall", getAll);

userRouter.patch("/:id",  updateUser);

userRouter.delete("/:id", deleteUser);
