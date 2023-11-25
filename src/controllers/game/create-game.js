import { compare } from "bcrypt";
import { db } from "../../utils/sqlite-db.js";
import { Forbidden } from "../../utils/errors/forbidden.js";
import { GameRepository } from "../../models/game.js";

/**
 * @typedef {Object} GameRequestBody
 * @property {string} name - The game name.
 * @property {string} description - The game description.
 * @property {string} image - The game image.
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
