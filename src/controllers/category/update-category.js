import { CategoryRepository } from "../../models/category.js";
import { GameRepository } from "../../models/game.js";
import { PlatformRepository } from "../../models/platform.js";
import { notFound } from "../../utils/errors/not-found.js";

/**
 * @typedef {Object} PlatformRequestBody
 * @property {string} name - The game name.
 * @property {string} description - The game description.
 */

/**
 * Handles user login.
 * @param {import('express').Request<{}, {}, GameRequestBody>} req - The Express request object.
 * @param {import('express').Response} res - The Express response object.
 */
export async function updateCategory(req, res) {
  const { name, description } = req.body;
  const { id } = req.params;

  const category = await CategoryRepository.getById(id);
  if (!category) {
    throw notFound();
  }

  const updatedCategory = await CategoryRepository.update(
    id,
    name,
    description
  );

  return updatedCategory;
}
