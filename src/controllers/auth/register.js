import { UserRepository } from "../../models/user.js";
import { db } from "../../utils/sqlite-db.js";
import { hash } from "bcrypt";

/**
 * @typedef {Object} RegisterRequestBody
 * @property {string} email - The user's email.
 * @property {string} password - The user's password.
 * @property {username} password - The user's password.
 */

/**
 * Handles user register.
 * @param {import('express').Request<{}, {}, RegisterRequestBody>} req - The Express request object.
 * @param {import('express').Response} res - The Express response object.
 */
export async function register(req, res) {
  const { username, email, password } = req.body;

  const hashPassword = await hash(password, 10);

  await UserRepository.create(username, email, hashPassword);

  return {
    message: "registered",
  };
}
