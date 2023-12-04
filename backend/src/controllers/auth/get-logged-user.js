import { db } from "../../utils/sqlite-db.js";

/**
 * get logged user.
 * @param {import('express').Request} req - The Express request object.
 * @param {import('express').Response} res - The Express response object.
 */
export async function getLoggedUser(req, res) {
  return req.user.toJSON();
}
