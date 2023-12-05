import { db } from "../utils/sqlite-db.js";
import { PlatformRepository } from "./platform.js";

export class Game {
  constructor(id, name, description, image, launchDate, createdAt, updatedAt) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.image = image;
    this.launchDate = launchDate;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static fromJSON(game) {
    const { id, name, description, image, launchDate, createdAt, updatedAt } =
      game;
    return new Game(
      id,
      name,
      description,
      image,
      launchDate,
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
      launchDate: this.launchDate,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}

export class GameRepository {
  static async getById(id) {
    const game = await db.get("SELECT * FROM Games WHERE id = ?", id);

    if (!game) return null;
    return Game.fromJSON(game);
  }

  static async findAll() {
    const rawGames = await db.all("SELECT * FROM Games");

    return rawGames.map(Game.fromJSON);
  }

  static async create(name, description, image, launchDate) {
    const result = await db.run(
      "INSERT INTO Games (name, description, image, launchDate, createdAt, updatedAt) VALUES (?, ?, ?, ?, datetime('now'), datetime('now'))",
      name,
      description,
      image,
      launchDate
    );
    return this.getById(result.lastID);
  }

  static async update(id, name, description, image, launchDate) {
    const result = await db.run(
      "UPDATE Games SET name = ?, description = ?, image = ?, launchDate = ?, updatedAt = datetime('now') WHERE id = ?",
      name,
      description,
      image,
      launchDate,
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
