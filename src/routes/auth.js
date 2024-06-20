import { Router } from "express";
import { registerHandler } from "../handlers/authHandler";
import validateFields from "../middlewares/validateFields";

const authRouter = Router();

//registro de usuarios
authRouter.post("/register", validateFields, registerHandler);

export default authRouter;
