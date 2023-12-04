import { GameRepository } from "../../models/game.js";
import { PlatformRepository } from "../../models/platform.js";
import { notFound } from "../../utils/errors/not-found.js";

/**
 * @typedef {Object} PlatformRequestBody
 * @property {string} name - The game name.
 * @property {string} description - The game description.
 * @property {string} image - The game image.
 * @property {string} link - The game platform.
 */

/**
 * Handles user login.
 * @param {import('express').Request<{}, {}, GameRequestBody>} req - The Express request object.
 * @param {import('express').Response} res - The Express response object.
 */
export async function updatePlatform(req, res) {
  const { name, description, image, link } = req.body;
  const { id } = req.params;

  const platform = await PlatformRepository.getById(id);
  if (!platform) {
    throw notFound();
  }

  const updatedPlatform = await PlatformRepository.update(
    id,
    name,
    description,
    image,
    link
  );

  return updatedPlatform;
}
