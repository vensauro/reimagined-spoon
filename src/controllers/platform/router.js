import express from "express";
import { wrap } from "../../utils/express-promise.js";
import { authentication } from "../../utils/auth-middleware.js";
import { createPlatform } from "./create-platform.js";
import { updatePlatform } from "./update-platform.js";
import { listPlatform } from "./list-platforms.js";
import { getPlatform } from "./get-platform.js";
import { removePlatform } from "./remove-platform.js";

export const platformRouter = express.Router();

platformRouter.get("/", authentication, wrap(listPlatform));
platformRouter.get("/:id", authentication, wrap(getPlatform));
platformRouter.post("/", authentication, wrap(createPlatform));
platformRouter.put("/:id", authentication, wrap(updatePlatform));
platformRouter.delete("/:id", authentication, wrap(removePlatform));
