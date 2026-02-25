import { env } from "@former/env/server";
import cors from "cors";
import express from "express";
import authRoutes from "@/presentation/routes/auth.routes";
import { errorHandler } from "@/presentation/middlewares/error-handler.middleware";

const app = express();

app.use(
  cors({
    origin: env.CORS_ORIGIN,
    methods: ["GET", "POST", "OPTIONS"],
  }),
);

app.use(express.json());

app.get("/", (_req, res) => {
  res.status(200).send("OK");
});

app.use("/api/auth", authRoutes);

app.use(errorHandler);

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
