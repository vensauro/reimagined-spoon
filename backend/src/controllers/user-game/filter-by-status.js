import { UserGameRepository } from "../../models/user-game.js";

/**
 * get games from a user library by status.
 * @param {import('express').Request} req - The Express request object.
 * @param {import('express').Response} res - The Express response object.
 */
export async function listUserGamesByStatus(req, res) {
  const userGames = await UserGameRepository.getByStatus(
    req.user.id,
    req.params.recommendation
  );

  return userGames;
}
