import { Router } from "express";
import authRouter from "./auth";

const router = Router();

router.use("/authentication", authRouter);
export default router;
