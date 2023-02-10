import express from "express"
import { register } from "../controllers/user-controller.js";
import { login } from "../controllers/user-controller.js";
const userRouter=express.Router()
userRouter.post("/register",register);
userRouter.post("/login",login);
export default userRouter