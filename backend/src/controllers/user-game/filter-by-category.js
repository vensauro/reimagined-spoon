import { UserGameRepository } from "../../models/user-game.js";

/**
 * get games from a user library by recommendation.
 * @param {import('express').Request} req - The Express request object.
 * @param {import('express').Response} res - The Express response object.
 */
export async function listUserGamesByCategory(req, res) {
  const userGames = await UserGameRepository.findByCategory(
    req.user.id,
    req.query.categoryId
  );

  return userGames;
}
