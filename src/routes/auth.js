import { Router } from "express";
import logoutHandler, { loginHandler, registerHandler } from "../handlers/authHandler";
import validateFields from "../middlewares/validateFields";

const authRouter = Router();

//registro de usuarios
authRouter.post("/register", validateFields, registerHandler);
authRouter.post("/login", validateFields, loginHandler)
authRouter.get("/logout", logoutHandler)
authRouter.get("/login_status", (req, res) => {
    const token = req?.headers?.authorization?.split(" ")[1]
    return res.status(!token ? 401 : 200).json(!!token)
});


export default authRouter;
