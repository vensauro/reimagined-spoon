import { UserGameRepository } from "../../models/user-game.js";
import { notFound } from "../../utils/errors/not-found.js";

/**
 * @typedef {Object} PlatformRequestBody
 * @property {string} rate - The game name.
 */

/**
 * Handles user login.
 * @param {import('express').Request<{}, {}, GameRequestBody>} req - The Express request object.
 * @param {import('express').Response} res - The Express response object.
 */
export async function updateUserGame(req, res) {
  const { rate } = req.body;
  const { gameId } = req.params;

  const userGame = await UserGameRepository.getOne(req.user.id, gameId);
  if (!userGame) {
    throw notFound();
  }

  const updatedUserGame = await UserGameRepository.update(
    req.user.id,
    gameId,
    rate
  );

  return updatedUserGame;
}
