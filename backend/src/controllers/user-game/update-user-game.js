import { Platform, PlatformRepository } from "../../models/platform.js";
import { UserGameRepository } from "../../models/user-game.js";
import { badRequest } from "../../utils/errors/bad-request.js";
import { notFound } from "../../utils/errors/not-found.js";

/**
 * @typedef {Object} PlatformRequestBody
 * @property {string} rate - The game name.
 * @property {string} platformId - The game platform.
 * @property {string} status - The user status on the game.
 * @property {string} progress - The user progress on the game.
 * @property {string} recommendation - The user recommendation on the game.
 * @property {string} mediaType - The user mediaType on the game.
 */

/**
 * Handles user login.
 * @param {import('express').Request<{}, {}, GameRequestBody>} req - The Express request object.
 * @param {import('express').Response} res - The Express response object.
 */
export async function updateUserGame(req, res) {
  const { rate, platformId, mediaType, progress, recommendation, status } =
    req.body;
  const { gameId } = req.params;

  const userGame = await UserGameRepository.getOne(req.user.id, gameId);
  if (!userGame) {
    throw notFound();
  }

  const platform = await PlatformRepository.getById(platformId);
  if (!platform) {
    throw badRequest();
  }

  const updatedUserGame = await UserGameRepository.update(
    req.user.id,
    gameId,
    rate,
    platform.id,
    status,
    progress,
    recommendation,
    mediaType
  );

  return updatedUserGame;
}
