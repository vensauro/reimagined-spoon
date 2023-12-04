import { UserGameRepository } from "../../models/user-game.js";

/**
 * Handles user login.
 * @param {import('express').Request} req - The Express request object.
 * @param {import('express').Response} res - The Express response object.
 */
export async function listUserGames(req, res) {
  const userGames = await UserGameRepository.findByUser(req.user.id);

  return userGames;
}
