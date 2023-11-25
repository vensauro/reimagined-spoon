import { db } from "../utils/sqlite-db.js";

class Game {
  constructor(id, name, description, image, platformId, createdAt, updatedAt) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.image = image;
    this.platformId = platformId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static fromJSON(json) {
    const { id, name, description, image, createdAt, updatedAt } = json;
    return new Game(id, name, description, image, createdAt, updatedAt);
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      image: this.image,
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
    const games = await db.all("SELECT * FROM Games");
    return games.map(Game.fromJSON);
  }

  static async create(name, description, image) {
    const result = await db.run(
      "INSERT INTO Games (name, description, image, createdAt, updatedAt) VALUES (?, ?, ?, datetime('now'), datetime('now'))",
      name,
      description,
      image
    );
    return this.getById(result.lastID);
  }

  static async update(id, name, description, image) {
    const result = await db.run(
      "UPDATE Games SET name = ?, description = ?, image = ?, updatedAt = datetime('now') WHERE id = ?",
      name,
      description,
      image,
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
