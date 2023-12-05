import { db } from "../utils/sqlite-db.js";
import { Game } from "./game.js";
import { Platform } from "./platform.js";

class UserGame {
  constructor(id, rate, game, platform, createdAt, updatedAt) {
    this.id = id;
    this.rate = rate;

    this.game = game;

    this.platform = platform;

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

      platformId,
      platformName,
      platformDescription,
      platformImage,
      platformLink,
      platformCreatedAt,
      platformUpdatedAt,
    } = json;
    const game = new Game(
      gameId,
      gameName,
      gameDescription,
      gameImage,
      gameCreatedAt,
      gameUpdatedAt
    );

    const platform = new Platform(
      platformId,
      platformName,
      platformDescription,
      platformImage,
      platformLink,
      platformCreatedAt,
      platformUpdatedAt
    );
    return new UserGame(id, rate, game, platform, createdAt, updatedAt);
  }

  toJSON() {
    return {
      id: this.id,
      rate: this.rate,

      game: this.game.toJSON(),

      platform: this.platform.toJSON(),

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
    UserGames.rate as rate,
    UserGames.createdAt as createdAt,
    UserGames.updatedAt as updatedAt,

    g.id AS gameId,
    g.name AS gameName,
    g.description AS gameDescription,
    g.image AS gameImage,
    g.createdAt AS gameCreatedAt,
    g.updatedAt AS gameUpdatedAt,

    p.id AS platformId,
    p.name AS platformName,
    p.description AS platformDescription,
    p.image AS platformImage,
    p.link AS platformLink,
    p.createdAt AS platformCreatedAt,
    p.updatedAt AS platformUpdatedAt
FROM
    UserGames
LEFT JOIN
    Games g ON UserGames.GameId = g.id
LEFT JOIN
    Platforms p ON UserGames.PlatformId = p.id
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
    UserGames.rate as rate,
    UserGames.createdAt as createdAt,
    UserGames.updatedAt as updatedAt,

    g.id AS gameId,
    g.name AS gameName,
    g.description AS gameDescription,
    g.image AS gameImage,
    g.createdAt AS gameCreatedAt,
    g.updatedAt AS gameUpdatedAt,

    p.id AS platformId,
    p.name AS platformName,
    p.description AS platformDescription,
    p.image AS platformImage,
    p.link AS platformLink,
    p.createdAt AS platformCreatedAt,
    p.updatedAt AS platformUpdatedAt
FROM
    UserGames
LEFT JOIN
    Games g ON UserGames.GameId = g.id
LEFT JOIN
    Platforms p ON UserGames.PlatformId = p.id
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
    UserGames.rate as rate,
    UserGames.createdAt as createdAt,
    UserGames.updatedAt as updatedAt,

    g.id AS gameId,
    g.name AS gameName,
    g.description AS gameDescription,
    g.image AS gameImage,
    g.createdAt AS gameCreatedAt,
    g.updatedAt AS gameUpdatedAt,

    p.id AS platformId,
    p.name AS platformName,
    p.description AS platformDescription,
    p.image AS platformImage,
    p.link AS platformLink,
    p.createdAt AS platformCreatedAt,
    p.updatedAt AS platformUpdatedAt
FROM
    UserGames
LEFT JOIN
    Games g ON UserGames.GameId = g.id
LEFT JOIN
    Platforms p ON UserGames.PlatformId = p.id
      `);
    return userGames.map(UserGame.fromJSON);
  }

  static async findByUser(userId) {
    const userGames = await db.all(
      `
SELECT
    UserGames.id as id,
    UserGames.rate as rate,
    UserGames.createdAt as createdAt,
    UserGames.updatedAt as updatedAt,

    g.id AS gameId,
    g.name AS gameName,
    g.description AS gameDescription,
    g.image AS gameImage,
    g.createdAt AS gameCreatedAt,
    g.updatedAt AS gameUpdatedAt,

    p.id AS platformId,
    p.name AS platformName,
    p.description AS platformDescription,
    p.image AS platformImage,
    p.link AS platformLink,
    p.createdAt AS platformCreatedAt,
    p.updatedAt AS platformUpdatedAt
FROM
    UserGames
LEFT JOIN
    Games g ON UserGames.GameId = g.id
LEFT JOIN
    Platforms p ON UserGames.PlatformId = p.id
WHERE
    UserId = ?
      `,
      userId
    );
    return userGames.map(UserGame.fromJSON);
  }

  static async create(rate, userId, gameId, platformId) {
    const result = await db.run(
      "INSERT INTO UserGames (rate, UserId, GameId, PlatformId, createdAt, updatedAt) VALUES (?, ?, ?, ?, datetime('now'), datetime('now'))",
      rate,
      userId,
      gameId,
      platformId
    );

    return result;
    // console.log(result);
    // return this.findById(result.lastID);
  }

  static async update(userId, gameId, rate, platformId) {
    await db.run(
      "UPDATE UserGames SET rate = ?, PlatformId = ?, updatedAt = datetime('now') WHERE UserId = ? AND GameId = ?",
      rate,
      platformId,
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
