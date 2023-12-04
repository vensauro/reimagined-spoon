import { GameRepository } from "../../models/game.js";
import { notFound } from "../../utils/errors/not-found.js";

/**
 * Handles user login.
 * @param {import('express').Request} req - The Express request object.
 * @param {import('express').Response} res - The Express response object.
 */
export async function listGames(req, res) {
  const games = await GameRepository.findAll();

  return games;
}
