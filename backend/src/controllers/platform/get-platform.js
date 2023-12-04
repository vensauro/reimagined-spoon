import { PlatformRepository } from "../../models/platform.js";
import { notFound } from "../../utils/errors/not-found.js";

/**
 * Handles user login.
 * @param {import('express').Request} req - The Express request object.
 * @param {import('express').Response} res - The Express response object.
 */
export async function getPlatform(req, res) {
  const { id } = req.params;

  const platform = await PlatformRepository.getById(id);
  if (!platform) {
    throw notFound();
  }

  return platform;
}
