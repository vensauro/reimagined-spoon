import { CategoryRepository } from "../../models/category.js";
import { GameRepository } from "../../models/game.js";
import { PlatformRepository } from "../../models/platform.js";
import { badRequest } from "../../utils/errors/bad-request.js";
import { notFound } from "../../utils/errors/not-found.js";

/**
 * Add category to the game.
 * @param {import('express').Request<{}, {}, {}>} req - The Express request object.
 * @param {import('express').Response} res - The Express response object.
 */
export async function addGameCategory(req, res) {
  const { gameId, categoryId } = req.params;

  const category = await CategoryRepository.getById(categoryId);
  const game = await GameRepository.getById(gameId);
  if (!category || !game) {
    throw badRequest();
  }

  try {
    await GameRepository.addCategory(game.id, category.id);
    return game;
  } catch (error) {
    console.error(error);
    badRequest();
  }
}
