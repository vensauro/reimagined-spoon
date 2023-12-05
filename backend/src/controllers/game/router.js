import express from "express";
import { wrap } from "../../utils/express-promise.js";
import { authentication } from "../../utils/auth-middleware.js";
import { createGame } from "./create-game.js";
import { updateGame } from "./update-game.js";
import { listGames } from "./list-games.js";
import { getGame } from "./get-game.js";
import { removeGame } from "./remove-game.js";
import { addGameCategory } from "./add-game-category.js";

export const gameRouter = express.Router();

gameRouter.get("/", authentication, wrap(listGames));
gameRouter.get("/:id", authentication, wrap(getGame));
gameRouter.post("/", authentication, wrap(createGame));
gameRouter.put("/:id", authentication, wrap(updateGame));
gameRouter.delete("/:id", authentication, wrap(removeGame));
gameRouter.post(
  "/:gameId/category/:categoryId",
  authentication,
  wrap(addGameCategory)
);
gameRouter.delete(
  "/:gameId/category/:categoryId",
  authentication,
  wrap(removeGame)
);
