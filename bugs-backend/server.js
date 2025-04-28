import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { loggerService } from "./services/logger.service.js";
import { bugService } from "./api/bug/bug.service.js";
import { userService } from "./services/user.service.js";

const app = express();

const corsOptions = {
  origin: ["http://127.0.0.1:5173", "http://localhost:5173"],
  credentials: true,
};

app.use(express.static("public"));
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());

import { bugRoutes } from "./api/bug/bug.routes.js";
app.use("/api/bug", bugRoutes);

import { userRoutes } from "./api/user/user.routes.js";
app.use("/api/user", userRoutes);

const port = 3030;
app.listen(port, () => {
  loggerService.info(`Example app listening on port http://127.0.0.1:${port}/`);
});
