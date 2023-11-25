import { UserRepository } from "../../models/user.js";
import { db } from "../../utils/sqlite-db.js";

/**
 * @typedef {Object} LoginRequestBody
 * @property {string} username - The user's email.
 */

/**
 * Update logged user.
 * @param {import('express').Request<{}, {}, LoginRequestBody>} req - The Express request object.
 * @param {import('express').Response} res - The Express response object.
 */
export async function updateProfile(req, res) {
  const { username } = req.body;

  await UserRepository.update(req.user.id, username);
  const user = await UserRepository.getById(req.user.id);
  return user;
}
