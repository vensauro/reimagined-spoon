import express from "express";
import { wrap } from "../../utils/express-promise.js";
import { authentication } from "../../utils/auth-middleware.js";
import { createUserGame } from "./create-user-game.js";
import { updateUserGame } from "./update-user-game.js";
import { listUserGames } from "./list-user-games.js";
import { getUserGame } from "./get-user-game.js";
import { removeUserGame } from "./remove-user-game.js";

export const userGameRouter = express.Router();

userGameRouter.get("/", authentication, wrap(listUserGames));
userGameRouter.get("/:gameId", authentication, wrap(getUserGame));
userGameRouter.post("/", authentication, wrap(createUserGame));
userGameRouter.put("/:gameId", authentication, wrap(updateUserGame));
userGameRouter.delete("/:gameId", authentication, wrap(removeUserGame));
