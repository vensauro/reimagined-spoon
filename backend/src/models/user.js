import { db } from "../utils/sqlite-db.js";

class User {
  constructor(
    id,
    username,
    avatar,
    email,
    password,
    role,
    createdAt,
    updatedAt
  ) {
    this.id = id;
    this.username = username;
    this.avatar = avatar;
    this.email = email;
    this.password = password;
    this.role = role;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static fromJSON(json) {
    const {
      id,
      username,
      avatar,
      email,
      password,
      role,
      createdAt,
      updatedAt,
    } = json;
    return new User(
      id,
      username,
      avatar,
      email,
      password,
      role,
      createdAt,
      updatedAt
    );
  }

  toJSON() {
    return {
      id: this.id,
      username: this.username,
      avatar: this.avatar,
      email: this.email,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}

export class UserRepository {
  static async getById(id) {
    const user = await db.get("SELECT * FROM Users WHERE id = ?", id);
    if (!user) return null;
    return User.fromJSON(user);
  }

  static async getByEmail(email) {
    const user = await db.get("SELECT * FROM Users WHERE email = ?", email);
    if (!user) return null;
    return User.fromJSON(user);
  }

  static async create(username, avatar, email, hashPassword) {
    return db.run(
      "INSERT INTO Users (username, avatar, email, password, role, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, datetime('now'), datetime('now'))",
      username,
      avatar,
      email,
      hashPassword,
      "user"
    );
  }
  static async update(id, username, avatar, email, password) {
    await db.run(
      "UPDATE Users SET username = ?, avatar = ?, email = ?, password = ?, updatedAt = datetime('now') WHERE id = ?",
      username,
      avatar,
      email,
      password,
      id
    );
  }

  static async delete(id) {
    await db.run("DELETE FROM Users WHERE id = ?", id);
  }
}
