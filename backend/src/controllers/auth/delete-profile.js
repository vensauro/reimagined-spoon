import { hash } from "bcrypt";
import { UserRepository } from "../../models/user.js";
import { db } from "../../utils/sqlite-db.js";

/**
 * @typedef {Object} LoginRequestBody
 * @property {string} username - The user's username.
 * @property {string} password - The user's password.
 * @property {string} email - The user's email.
 * @property {string} avatar - The user's avatar.
 */

/**
 * Update logged user.
 * @param {import('express').Request<{}, {}, LoginRequestBody>} req - The Express request object.
 * @param {import('express').Response} res - The Express response object.
 */
export async function deleteUser(req, res) {
  const user = await UserRepository.getById(req.user.id);

  console.log("deletabdio");
  await UserRepository.delete(req.user.id);

  return user;
}
