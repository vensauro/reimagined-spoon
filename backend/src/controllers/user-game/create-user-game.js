import { GameRepository } from "../../models/game.js";
import { PlatformRepository } from "../../models/platform.js";
import { UserGameRepository } from "../../models/user-game.js";
import { badRequest } from "../../utils/errors/bad-request.js";

/**
 * @typedef {Object} PlatformRequestBody
 * @property {string} rate - The user rate for the game.
 * @property {string} gameId - The the game reference.
 * @property {string} platformId - The user platform on the game.
 * @property {string} status - The user status on the game.
 * @property {string} progress - The user progress on the game.
 * @property {string} recommendation - The user recommendation on the game.
 * @property {string} mediaType - The user mediaType on the game.
 */

/**
 * Handles user login.
 * @param {import('express').Request<{}, {}, PlatformRequestBody>} req - The Express request object.
 * @param {import('express').Response} res - The Express response object.
 */
export async function createUserGame(req, res) {
  const {
    rate,
    gameId,
    platformId,
    mediaType,
    progress,
    recommendation,
    status,
  } = req.body;

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
      platform.id,
      status,
      progress,
      recommendation,
      mediaType
    );
    res.status(201);
    return userGame;
  } catch {
    throw badRequest();
  }
}
