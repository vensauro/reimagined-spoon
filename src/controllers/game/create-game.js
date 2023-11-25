import { GameRepository } from "../../models/game.js";

/**
 * @typedef {Object} GameRequestBody
 * @property {string} name - The game name.
 * @property {string} description - The game description.
 * @property {string} image - The game image.
 * @property {string} platformId - The game platform.
 */

/**
 * Handles user login.
 * @param {import('express').Request<{}, {}, GameRequestBody>} req - The Express request object.
 * @param {import('express').Response} res - The Express response object.
 */
export async function createGame(req, res) {
  const { name, description, image } = req.body;

  const game = await GameRepository.create(name, description, image);

  res.status(201);
  return game;
}
