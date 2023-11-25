import "dotenv/config";

import { sequelize } from "./models/index.js";

import { sequelizeSync } from "./models/sync.js";

import express from "express";
import { db } from "./utils/sqlite-db.js";
import { authRouter } from "./controllers/auth/router.js";
import {
  genericErrorHandler,
  notFoundHandler,
} from "./utils/error-middleware.js";

const app = express();

await sequelizeSync();

app.use(express.json());

app.use("/auth", authRouter);
app.use(notFoundHandler);
app.use(genericErrorHandler);

const port = process.env.PORT ?? 3000;
app.listen(port, () => console.log(`server started on port ${port} 🚀`));
