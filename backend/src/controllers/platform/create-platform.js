import { PlatformRepository } from "../../models/platform.js";

/**
 * @typedef {Object} PlatformRequestBody
 * @property {string} name - The game name.
 * @property {string} description - The game description.
 * @property {string} image - The game image.
 * @property {string} link - The game platform.
 */

/**
 * Handles user login.
 * @param {import('express').Request<{}, {}, PlatformRequestBody>} req - The Express request object.
 * @param {import('express').Response} res - The Express response object.
 */
export async function createPlatform(req, res) {
  const { name, description, image, link } = req.body;

  const platform = await PlatformRepository.create(
    name,
    description,
    image,
    link
  );

  res.status(201);
  return platform;
}
