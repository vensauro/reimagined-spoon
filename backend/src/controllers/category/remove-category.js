import { CategoryRepository } from "../../models/category.js";
import { PlatformRepository } from "../../models/platform.js";
import { notFound } from "../../utils/errors/not-found.js";

/**
 * Handles user login.
 * @param {import('express').Request} req - The Express request object.
 * @param {import('express').Response} res - The Express response object.
 */
export async function removeCategory(req, res) {
  const { id } = req.params;

  const category = await CategoryRepository.delete(id);
  if (!category) {
    throw notFound();
  }

  return category;
}
