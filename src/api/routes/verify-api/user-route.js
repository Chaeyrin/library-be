import express from "express";
import {
  getDataUser,
  getUserById,
  updateUser,
  deleteUser,
  createOfficer,
} from "../../controllers/user-controller.js";

const userRouter = new express.Router();

userRouter.post("/users", createOfficer);
userRouter.get("/users", getDataUser);
userRouter.get("/users/:id", getUserById);
userRouter.patch("/users/:id", updateUser);
userRouter.delete("/users/:id", deleteUser);

export { userRouter };
