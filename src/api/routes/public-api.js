import { Router } from "express";
import { loginUser, registerUser } from "../controllers/auth-controller.js";

const publicRouter = Router();

publicRouter.post("/register", registerUser);
publicRouter.post("/login", loginUser);

export { publicRouter };
