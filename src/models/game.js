import { db } from "../utils/sqlite-db.js";
import { PlatformRepository } from "./platform.js";

class Game {
  constructor(id, name, description, image, platform, createdAt, updatedAt) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.image = image;
    this.platform = platform;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static fromJSON(game, platform) {
    const { id, name, description, image, createdAt, updatedAt } = game;
    return new Game(
      id,
      name,
      description,
      image,
      platform,
      createdAt,
      updatedAt
    );
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      image: this.image,
      platform: this.platform,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}

export class GameRepository {
  static async getById(id) {
    const game = await db.get("SELECT * FROM Games WHERE id = ?", id);
    const platform = await PlatformRepository.getById(game.PlatformId);

    if (!game) return null;
    return Game.fromJSON(game, platform);
  }

  static async findAll() {
    const rawGames = await db.all("SELECT * FROM Games");
    const platforms = await PlatformRepository.findAllById(
      rawGames.map((e) => e.PlatformId)
    );

    return rawGames.map((rawGame) =>
      Game.fromJSON(
        rawGame,
        platforms.find((p) => p.id === rawGame.PlatformId)
      )
    );
  }

  static async create(name, description, image, platformId) {
    const result = await db.run(
      "INSERT INTO Games (name, description, image, PlatformId, createdAt, updatedAt) VALUES (?, ?, ?, ?, datetime('now'), datetime('now'))",
      name,
      description,
      image,
      platformId
    );
    return this.getById(result.lastID);
  }

  static async update(id, name, description, image, platformId) {
    const result = await db.run(
      "UPDATE Games SET name = ?, description = ?, image = ?, PlatformId = ?, updatedAt = datetime('now') WHERE id = ?",
      name,
      description,
      image,
      platformId,
      id
    );

    return this.getById(id);
  }

  static async delete(id) {
    const game = await this.getById(id);
    if (!game) return null;

    await db.run("DELETE FROM Games WHERE id = ?", id);

    return game;
  }
}
