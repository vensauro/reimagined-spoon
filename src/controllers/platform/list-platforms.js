import { PlatformRepository } from "../../models/platform.js";

/**
 * Handles user login.
 * @param {import('express').Request} req - The Express request object.
 * @param {import('express').Response} res - The Express response object.
 */
export async function listPlatforms(req, res) {
  const platforms = await PlatformRepository.findAll();

  return platforms;
}
