import { GameRepository } from "../../models/game.js";
import { UserGameRepository } from "../../models/user-game.js";
import { badRequest } from "../../utils/errors/bad-request.js";

/**
 * @typedef {Object} PlatformRequestBody
 * @property {string} rate - The user rate for the game.
 * @property {string} gameId - The the game reference.
 */

/**
 * Handles user login.
 * @param {import('express').Request<{}, {}, PlatformRequestBody>} req - The Express request object.
 * @param {import('express').Response} res - The Express response object.
 */
export async function createUserGame(req, res) {
  const { rate, gameId } = req.body;

  const game = await GameRepository.getById(gameId);
  if (!game) {
    throw badRequest("game id wrong");
  }

  const userGame = await UserGameRepository.create(rate, req.user.id, game.id);

  res.status(201);
  return userGame;
}
