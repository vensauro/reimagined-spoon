import express from "express";
import { wrap } from "../../utils/express-promise.js";
import { authentication } from "../../utils/auth-middleware.js";
import { createCategory } from "./create-category.js";
import { updateCategory } from "./update-category.js";
import { listCategories } from "./list-categories.js";
import { getCategory } from "./get-category.js";
import { removeCategory } from "./remove-category.js";

export const categoryRouter = express.Router();

categoryRouter.get("/", authentication, wrap(listCategories));
categoryRouter.get("/:id", authentication, wrap(getCategory));
categoryRouter.post("/", authentication, wrap(createCategory));
categoryRouter.put("/:id", authentication, wrap(updateCategory));
categoryRouter.delete("/:id", authentication, wrap(removeCategory));
