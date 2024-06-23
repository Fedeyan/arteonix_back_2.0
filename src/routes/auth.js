import { Router } from "express";
import { registerHandler } from "../handlers/authHandler";
import validateFields from "../middlewares/validateFields";

const authRouter = Router();

//registro de usuarios
authRouter.post("/register", validateFields, registerHandler);
authRouter.post("/login_status", (req, res) => {
    return res.json(true)
});


export default authRouter;
