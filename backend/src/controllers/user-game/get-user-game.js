import { UserGameRepository } from "../../models/user-game.js";
import { notFound } from "../../utils/errors/not-found.js";

/**
 * Handles user login.
 * @param {import('express').Request} req - The Express request object.
 * @param {import('express').Response} res - The Express response object.
 */
export async function getUserGame(req, res) {
  const { gameId } = req.params;

  const userGame = await UserGameRepository.getOne(req.user.id, gameId);
  if (!userGame) {
    throw notFound();
  }

  return userGame;
}
