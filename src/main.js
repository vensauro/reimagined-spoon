import "dotenv/config";

import { sequelizeSync } from "./models/sync.js";

import express from "express";
import { authRouter } from "./controllers/auth/router.js";
import { gameRouter } from "./controllers/game/router.js";
import {
  genericErrorHandler,
  notFoundHandler,
} from "./utils/error-middleware.js";

const app = express();

await sequelizeSync();

app.use(express.json());

app.use("/auth", authRouter);
app.use("/games", gameRouter);
app.use(notFoundHandler);
app.use(genericErrorHandler);

const port = process.env.PORT ?? 3000;
app.listen(port, () => console.log(`server started on port ${port} 🚀`));
