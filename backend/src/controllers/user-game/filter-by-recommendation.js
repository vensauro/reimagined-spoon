import { UserGameRepository } from "../../models/user-game.js";

/**
 * get games from a user library by recommendation.
 * @param {import('express').Request} req - The Express request object.
 * @param {import('express').Response} res - The Express response object.
 */
export async function listUserGamesByRecommendation(req, res) {
  const userGames = await UserGameRepository.findByRecommendation(
    req.user.id,
    req.query.recommendation
  );

  return userGames;
}
