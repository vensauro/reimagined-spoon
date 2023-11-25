import { CategoryRepository } from "../../models/category.js";
import { PlatformRepository } from "../../models/platform.js";

/**
 * @typedef {Object} PlatformRequestBody
 * @property {string} name - The game name.
 * @property {string} description - The game description.
 */

/**
 * @param {import('express').Request<{}, {}, PlatformRequestBody>} req - The Express request object.
 * @param {import('express').Response} res - The Express response object.
 */
export async function createCategory(req, res) {
  const { name, description } = req.body;

  const category = await CategoryRepository.create(name, description);

  res.status(201);
  return category;
}
