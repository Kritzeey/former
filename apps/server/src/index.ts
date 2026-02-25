import { env } from "@former/env/server";
import cors from "cors";
import express from "express";
import userRoutes from "@/presentation/routes/user.routes";

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

app.use("/api/users", userRoutes);

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
