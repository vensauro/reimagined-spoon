import { DataTypes } from "sequelize";
import { sequelize } from "./index.js";
import { db } from "../utils/sqlite-db.js";

export const UserSequelize = sequelize.define("User", {
  username: DataTypes.STRING,
  email: {
    type: DataTypes.STRING,
    unique: true,
  },
  password: DataTypes.STRING,
  role: DataTypes.STRING,
});

class User {
  constructor(id, username, email, password, role, createdAt, updatedAt) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.password = password;
    this.role = role;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static fromJSON(json) {
    const { id, username, email, password, role, createdAt, updatedAt } = json;
    return new User(id, username, email, password, role, createdAt, updatedAt);
  }

  toJSON() {
    return {
      id: this.id,
      username: this.username,
      email: this.email,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}

export class UserRepository {
  static async getById(id) {
    const user = await db.get("SELECT * FROM Users WHERE id = ?", id);
    return User.fromJSON(user);
  }

  static async getByEmail(email) {
    const user = await db.get("SELECT * FROM Users WHERE email = ?", email);
    return User.fromJSON(user);
  }

  static async create(username, email, hashPassword) {
    return db.run(
      "INSERT INTO Users (username, email, password, role, createdAt, updatedAt) VALUES (?, ?, ?, ?, datetime('now'), datetime('now'))",
      username,
      email,
      hashPassword,
      "user"
    );

    // return User.fromJSON(user);
  }
  static async update(id, username) {
    await db.run(
      "UPDATE Users SET username = ?, updatedAt = datetime('now') WHERE id = ?",
      username,
      id
    );

    // return User.fromJSON(user);
  }
}
