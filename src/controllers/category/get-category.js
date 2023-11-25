import { CategoryRepository } from "../../models/category.js";
import { notFound } from "../../utils/errors/not-found.js";

/**
 * Handles user login.
 * @param {import('express').Request} req - The Express request object.
 * @param {import('express').Response} res - The Express response object.
 */
export async function getCategory(req, res) {
  const { id } = req.params;

  const category = await CategoryRepository.getById(id);
  if (!category) {
    throw notFound();
  }

  return category;
}
