import { GameRepository } from "../../models/game.js";
import { notFound } from "../../utils/errors/not-found.js";

/**
 * Handles user login.
 * @param {import('express').Request} req - The Express request object.
 * @param {import('express').Response} res - The Express response object.
 */
export async function removeGame(req, res) {
  const { id } = req.params;

  const game = await GameRepository.delete(id);
  if (!game) {
    throw notFound();
  }

  return game;
}
