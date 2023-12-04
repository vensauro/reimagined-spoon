import { db } from "../utils/sqlite-db.js";
import { Game } from "./game.js";

class UserGame {
  constructor(id, rate, game, createdAt, updatedAt) {
    this.id = id;
    this.rate = rate;

    this.game = game;

    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static fromJSON(json) {
    const {
      id,
      rate,
      createdAt,
      updatedAt,
      gameId,
      gameName,
      gameDescription,
      gameImage,
      gameCreatedAt,
      gameUpdatedAt,
    } = json;
    const game = new Game(
      gameId,
      gameName,
      gameDescription,
      gameImage,
      gameCreatedAt,
      gameUpdatedAt
    );
    return new UserGame(id, rate, game, createdAt, updatedAt);
  }

  toJSON() {
    return {
      id: this.id,
      rate: this.rate,

      game: this.game.toJSON(),

      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}

export class UserGameRepository {
  static async findById(id) {
    const userGame = await db.get(
      `
    SELECT
        UserGames.id as id,
        rate,
        UserGames.createdAt as createdAt,
        UserGames.updatedAt as updatedAt,
        g.id AS gameId,
        g.name AS gameName,
        g.description AS gameDescription,
        g.image AS gameImage,
        g.createdAt AS gameCreatedAt,
        g.updatedAt AS gameUpdatedAt
    FROM
        UserGames
    LEFT JOIN
        Games g ON UserGames.GameId = g.id
    WHERE
      id = ?
    `,
      id
    );
    if (!userGame) return null;
    return UserGame.fromJSON(userGame);
  }
  static async getOne(userId, gameId) {
    const userGame = await db.get(
      `
SELECT
    UserGames.id as id,
    rate,
    UserGames.createdAt as createdAt,
    UserGames.updatedAt as updatedAt,
    g.id AS gameId,
    g.name AS gameName,
    g.description AS gameDescription,
    g.image AS gameImage,
    g.createdAt AS gameCreatedAt,
    g.updatedAt AS gameUpdatedAt
FROM
    UserGames
LEFT JOIN
    Games g ON UserGames.GameId = g.id
WHERE
    UserId = ?
    AND GameId = ?
  `,
      userId,
      gameId
    );
    if (!userGame) return null;
    return UserGame.fromJSON(userGame);
  }

  static async findAll() {
    const userGames = await db.all(`
    SELECT
        UserGames.id as id,
        rate,
        UserGames.createdAt as createdAt,
        UserGames.updatedAt as updatedAt,
        g.id AS gameId,
        g.name AS gameName,
        g.description AS gameDescription,
        g.image AS gameImage,
        g.createdAt AS gameCreatedAt,
        g.updatedAt AS gameUpdatedAt
    FROM
        UserGames
    LEFT JOIN
        Games g ON UserGames.GameId = g.id
      `);
    return userGames.map(UserGame.fromJSON);
  }

  static async findByUser(userId) {
    const userGames = await db.all(
      `
    SELECT
        UserGames.id as id,
        rate,
        UserGames.createdAt as createdAt,
        UserGames.updatedAt as updatedAt,
        g.id AS gameId,
        g.name AS gameName,
        g.description AS gameDescription,
        g.image AS gameImage,
        g.createdAt AS gameCreatedAt,
        g.updatedAt AS gameUpdatedAt
    FROM
        UserGames
    LEFT JOIN
        Games g ON UserGames.GameId = g.id
    WHERE
        UserId = ?
      `,
      userId
    );
    return userGames.map(UserGame.fromJSON);
  }

  static async create(rate, userId, gameId) {
    const result = await db.run(
      "INSERT INTO UserGames (rate, UserId, GameId, createdAt, updatedAt) VALUES (?, ?, ?, datetime('now'), datetime('now'))",
      rate,
      userId,
      gameId
    );
    return this.findById(result.lastID);
  }

  static async update(userId, gameId, rate) {
    await db.run(
      "UPDATE UserGames SET rate = ?, updatedAt = datetime('now') WHERE UserId = ? AND GameId = ?",
      rate,
      userId,
      gameId
    );

    return this.getOne(userId, gameId);
  }

  static async delete(userId, gameId) {
    const userGame = await this.getOne(userId, gameId);
    if (!userGame) return null;

    await db.run(
      "DELETE FROM UserGames WHERE UserId = ? AND GameId = ?",
      userId,
      gameId
    );

    return userGame;
  }
}
