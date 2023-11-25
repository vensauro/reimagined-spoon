import { compare } from "bcrypt";
import { db } from "../../utils/sqlite-db.js";
import { Forbidden } from "../../utils/errors/forbidden.js";
import jsonwebtoken from "jsonwebtoken";

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

  const userRaw = await db.get("SELECT * FROM Users WHERE email = ?", email);

  const isPasswordCorrect = await compare(password, userRaw.password);

  if (!isPasswordCorrect) {
    throw new Forbidden(req.url);
  }

  const token = sign(
    {
      user: {
        id: userRaw.id,
        username: userRaw.username,
        email: userRaw.email,
      },
    },
    process.env.JWT_KEY,
    { expiresIn: "154h" }
  );

  return { token };
}
