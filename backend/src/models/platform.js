import { db } from "../utils/sqlite-db.js";

class Platform {
  constructor(id, name, description, image, link, createdAt, updatedAt) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.image = image;
    this.link = link;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static fromJSON(json) {
    const { id, name, description, image, link, createdAt, updatedAt } = json;
    return new Platform(
      id,
      name,
      description,
      image,
      link,
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
      link: this.link,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}

export class PlatformRepository {
  static async getById(id) {
    const platform = await db.get("SELECT * FROM Platforms WHERE id = ?", id);
    if (!platform) return null;
    return Platform.fromJSON(platform);
  }

  static async findAll() {
    const platforms = await db.all("SELECT * FROM Platforms");
    return platforms.map(Platform.fromJSON);
  }

  static async findAllById(ids) {
    const placeholders = ids.map(() => "?").join(",");
    const platforms = await db.all(
      `SELECT * FROM Platforms WHERE id in (${placeholders})`,
      ids
    );
    return platforms.map(Platform.fromJSON);
  }

  static async create(name, description, image, link) {
    const result = await db.run(
      "INSERT INTO Platforms (name, description, image, link, createdAt, updatedAt) VALUES (?, ?, ?, ?, datetime('now'), datetime('now'))",
      name,
      description,
      image,
      link
    );
    return this.getById(result.lastID);
  }

  static async update(id, name, description, image, link) {
    await db.run(
      "UPDATE Platforms SET name = ?, description = ?, image = ?, link = ?, updatedAt = datetime('now') WHERE id = ?",
      name,
      description,
      image,
      link,
      id
    );

    return this.getById(id);
  }

  static async delete(id) {
    const platform = await this.getById(id);
    if (!platform) return null;

    await db.run("DELETE FROM Platforms WHERE id = ?", id);

    return platform;
  }
}
