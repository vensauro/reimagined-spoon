import "dotenv/config";

import express from "express";
import {
  authRouter,
  gameRouter,
  platformRouter,
  categoryRouter,
  userGameRouter,
} from "./controllers/router.js";
import {
  genericErrorHandler,
  notFoundHandler,
} from "./utils/error-middleware.js";
import { sequelize } from "./models/sequelize-init.js";
import cors from "cors";
import { populateDatabase } from "./utils/populate-database.js";

const app = express();

await sequelize.sync({ force: true });

populateDatabase();

app.use(express.json());
app.use(cors());

app.use("/auth", authRouter);
app.use("/games", gameRouter);
app.use("/platforms", platformRouter);
app.use("/categories", categoryRouter);
app.use("/user-games", userGameRouter);

app.use(notFoundHandler);
app.use(genericErrorHandler);

const port = process.env.PORT ?? 3000;
app.listen(port, () => console.log(`server started on port ${port} 🚀`));
