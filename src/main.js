import "dotenv/config";

import express from "express";
import {
  authRouter,
  gameRouter,
  platformRouter,
} from "./controllers/router.js";
import {
  genericErrorHandler,
  notFoundHandler,
} from "./utils/error-middleware.js";
import { sequelize } from "./models/sequelize-init.js";

const app = express();

await sequelize.sync({ force: false });

app.use(express.json());

app.use("/auth", authRouter);
app.use("/games", gameRouter);
app.use("/platforms", platformRouter);

app.use(notFoundHandler);
app.use(genericErrorHandler);

const port = process.env.PORT ?? 3000;
app.listen(port, () => console.log(`server started on port ${port} 🚀`));
