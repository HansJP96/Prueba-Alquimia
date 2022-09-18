import express from "express";
import { logInUser } from "../controller/auth/LoginUser";
import { registerNewUser } from "../controller/auth/RegisterUser";
import { middleAuthValidator } from "../utils/validations/auth/MiddleAuthValidator";

const authRouter = express.Router()

authRouter.post("/register", middleAuthValidator, registerNewUser)

authRouter.post("/login", middleAuthValidator, logInUser)

export default authRouter