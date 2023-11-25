import { CategoryRepository } from "../../models/category.js";

/**
 * Handles user login.
 * @param {import('express').Request} req - The Express request object.
 * @param {import('express').Response} res - The Express response object.
 */
export async function listCategories(req, res) {
  const categories = await CategoryRepository.findAll();

  return categories;
}
