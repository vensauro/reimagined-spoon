import { GameRepository } from "../../models/game.js";
import { PlatformRepository } from "../../models/platform.js";
import { UserGameRepository } from "../../models/user-game.js";
import { badRequest } from "../../utils/errors/bad-request.js";

/**
 * @typedef {Object} PlatformRequestBody
 * @property {string} rate - The user rate for the game.
 * @property {string} gameId - The the game reference.
 * @property {string} platformId - The the game platform.
 */

/**
 * Handles user login.
 * @param {import('express').Request<{}, {}, PlatformRequestBody>} req - The Express request object.
 * @param {import('express').Response} res - The Express response object.
 */
export async function createUserGame(req, res) {
  const { rate, gameId, platformId } = req.body;

  const game = await GameRepository.getById(gameId);
  const platform = await PlatformRepository.getById(platformId);
  if (!game || !platform) {
    throw badRequest("game id wrong");
  }

  try {
    const userGame = await UserGameRepository.create(
      rate,
      req.user.id,
      game.id,
      platform.id
    );
    res.status(201);
    return userGame;
  } catch {
    throw badRequest();
  }
}
