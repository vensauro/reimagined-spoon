import { GameRepository } from "../../models/game.js";
import { PlatformRepository } from "../../models/platform.js";
import { notFound } from "../../utils/errors/not-found.js";

/**
 * @typedef {Object} GameRequestBody
 * @property {string} name - The game name.
 * @property {string} description - The game description.
 * @property {string} image - The game image.
 * @property {string} launchDate - The game launch date.
 */

/**
 * Handles user login.
 * @param {import('express').Request<{}, {}, GameRequestBody>} req - The Express request object.
 * @param {import('express').Response} res - The Express response object.
 */
export async function updateGame(req, res) {
  const { name, description, image, launchDate } = req.body;
  const { id } = req.params;

  const game = await GameRepository.getById(id);
  if (!game) {
    throw notFound();
  }

  const updatedGame = await GameRepository.update(
    id,
    name,
    description,
    image,
    launchDate
  );

  return updatedGame;
}
