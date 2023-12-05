import { db } from "../utils/sqlite-db.js";

class Category {
  constructor(id, name, description, createdAt, updatedAt) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static fromJSON(json) {
    const { id, name, description, createdAt, updatedAt } = json;
    return new Category(id, name, description, createdAt, updatedAt);
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}

export class CategoryRepository {
  static async getById(id) {
    const category = await db.get("SELECT * FROM Categories WHERE id = ?", id);
    if (!category) return null;
    return Category.fromJSON(category);
  }

  static async findAll() {
    const categories = await db.all("SELECT * FROM Categories");
    return categories.map(Category.fromJSON);
  }

  static async create(name, description) {
    const result = await db.run(
      "INSERT INTO Categories (name, description, createdAt, updatedAt) VALUES (?, ?, datetime('now'), datetime('now'))",
      name,
      description
    );
    return this.getById(result.lastID);
  }

  static async update(id, name, description) {
    await db.run(
      "UPDATE Categories SET name = ?, description = ?, updatedAt = datetime('now') WHERE id = ?",
      name,
      description,
      id
    );

    return this.getById(id);
  }

  static async delete(id) {
    const category = await this.getById(id);
    if (!category) return null;

    await db.run("DELETE FROM Categories WHERE id = ?", id);

    return category;
  }

  static async getGamesCategory(gameId) {
    const rawCategories = await db.all(
      "SELECT * FROM Categories WHERE id IN (SELECT id FROM GameCategory WHERE GameId = ?)",
      gameId
    );
    return rawCategories.map(Category.fromJSON);
  }
}
