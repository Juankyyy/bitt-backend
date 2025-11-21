import { Router } from "express";
import { UserController } from "./user.controller.js";

export const userRouter = Router();
// login and register in app

userRouter.get("/:id", UserController.getById);

userRouter.get("/username/:username", UserController.getByUsername);

userRouter.patch("/:id", UserController.update);