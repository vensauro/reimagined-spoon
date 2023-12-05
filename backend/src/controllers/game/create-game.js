import { GameRepository } from "../../models/game.js";
import { PlatformRepository } from "../../models/platform.js";
import { badRequest } from "../../utils/errors/bad-request.js";

/**
 * @typedef {Object} GameRequestBody
 * @property {string} name - The game name.
 * @property {string} description - The game description.
 * @property {string} image - The game image.
 * @property {string} launchDate - The game launch date.
 */

/**
 * @param {import('express').Request<{}, {}, GameRequestBody>} req - The Express request object.
 * @param {import('express').Response} res - The Express response object.
 */
export async function createGame(req, res) {
  const { name, description, image, launchDate } = req.body;

  const game = await GameRepository.create(
    name,
    description,
    image,
    launchDate
  );

  res.status(201);
  return game;
}
