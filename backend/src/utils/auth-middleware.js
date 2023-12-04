import { unauthorized } from "./errors/unauthorized.js";
import jsonwebtoken from "jsonwebtoken";
import { db } from "./sqlite-db.js";
import { UserRepository } from "../models/user.js";

const { verify } = jsonwebtoken;

/**
 * Verify jwt token.
 * @param {import('express').Request} req - The Express request object.
 * @param {import('express').Response} res - The Express response object.
 * @param {import('express').NextFunction} next - The Express next function.
 */
export async function authentication(req, res, next) {
  try {
    const token = req.headers.authorization?.split(" ")?.[1] ?? "";
    const decoded = verify(token, process.env.JWT_KEY);

    if (typeof decoded === "string") {
      throw unauthorized();
    }

    const user = await UserRepository.getById(decoded.user.id);

    if (!user) {
      throw unauthorized();
    }

    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    next(unauthorized());
  }
}
