import { compare } from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import { UserRepository } from "../../models/user.js";
import { Forbidden } from "../../utils/errors/forbidden.js";

const { sign } = jsonwebtoken;

/**
 * @typedef {Object} LoginRequestBody
 * @property {string} email - The user's email.
 * @property {string} password - The user's password.
 */

/**
 * Handles user login.
 * @param {import('express').Request<{}, {}, LoginRequestBody>} req - The Express request object.
 * @param {import('express').Response} res - The Express response object.
 */
export async function login(req, res) {
  const { email, password } = req.body;

  const user = await UserRepository.getByEmail(email);

  const isPasswordCorrect = await compare(password, user.password);

  if (!isPasswordCorrect) {
    throw new Forbidden(req.url);
  }

  const token = sign(
    {
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    },
    process.env.JWT_KEY,
    { expiresIn: "154h" }
  );

  return { token };
}
