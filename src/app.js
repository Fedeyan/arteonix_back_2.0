import express from "express";
import morgan from "morgan";
import cors from "cors";
import { config } from "dotenv";
import router from "./routes/router";

config();

const app = express();
const origin = process.env.CORS_ORIGIN || "http://localhost:5173";

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(
  cors({
    origin: origin,
  })
);

//routes
app.use("/v1", router);

export default app;
