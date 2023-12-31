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
export async function updateProfile(req, res) {
  const { username, avatar, email, password } = req.body;

  const hashPassword = password ? await hash(password, 10) : req.user.password;

  await UserRepository.update(
    req.user.id,
    username || req.user.username,
    avatar || req.user.avatar,
    email || req.user.email,
    hashPassword
  );

  const user = await UserRepository.getById(req.user.id);
  return user;
}
