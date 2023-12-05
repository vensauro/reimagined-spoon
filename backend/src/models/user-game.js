import { db } from "../utils/sqlite-db.js";
import { Game } from "./game.js";
import { Platform } from "./platform.js";

class UserGame {
  constructor(
    id,
    rate,

    game,
    platform,

    status,
    progress,
    recommendation,
    mediaType,

    createdAt,
    updatedAt
  ) {
    this.id = id;
    this.rate = rate;

    this.game = game;
    this.platform = platform;

    this.status = status;
    this.progress = progress;
    this.recommendation = recommendation;
    this.mediaType = mediaType;

    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static fromJSON(json) {
    const {
      id,
      rate,

      status,
      progress,
      recommendation,
      mediaType,

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
    return new UserGame(
      id,
      rate,
      game,
      platform,
      status,
      progress,
      recommendation,
      mediaType,
      createdAt,
      updatedAt
    );
  }

  toJSON() {
    return {
      id: this.id,
      rate: this.rate,

      status: this.status,
      progress: this.progress,
      recommendation: this.recommendation,
      mediaType: this.mediaType,

      game: this.game.toJSON(),
      platform: this.platform.toJSON(),

      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}

export class UserGameRepository {
  static getDefaultSql() {
    return `
SELECT
  UserGames.id as id,
  UserGames.rate as rate,
  UserGames.status as status,
  UserGames.progress as progress,
  UserGames.recommendation as recommendation,
  UserGames.mediaType as mediaType,
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
  `;
  }
  static async findById(id) {
    const userGame = await db.get(
      `
SELECT
    UserGames.id as id,
    UserGames.rate as rate,
    UserGames.status as status,
    UserGames.progress as progress,
    UserGames.recommendation as recommendation,
    UserGames.mediaType as mediaType,
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
    UserGames.status as status,
    UserGames.progress as progress,
    UserGames.recommendation as recommendation,
    UserGames.mediaType as mediaType,
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
    UserGames.status as status,
    UserGames.progress as progress,
    UserGames.recommendation as recommendation,
    UserGames.mediaType as mediaType,
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
    UserGames.status as status,
    UserGames.progress as progress,
    UserGames.recommendation as recommendation,
    UserGames.mediaType as mediaType,
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
  UserGames.UserId = ?
      `,
      userId
    );
    return userGames.map(UserGame.fromJSON);
  }

  static async getByStatus(userId, status) {
    const userGames = await db.all(
      this.getDefaultSql() +
        "WHERE UserGames.UserId = ? AND UserGames.status = ?",
      userId,
      status
    );
    return userGames.map(UserGame.fromJSON);
  }

  static async getByRecommendation(userId, recommendation) {
    const userGames = await db.all(
      this.getDefaultSql() +
        "WHERE UserGames.UserId = ? AND UserGames.recommendation = ?",
      userId,
      recommendation
    );
    return userGames.map(UserGame.fromJSON);
  }

  static async create(
    rate,
    userId,
    gameId,
    platformId,
    status,
    progress,
    recommendation,
    mediaType
  ) {
    const result = await db.run(
      "INSERT INTO UserGames (rate, UserId, GameId, PlatformId, status, progress, recommendation, mediaType, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, datetime('now'), datetime('now'))",
      rate,
      userId,
      gameId,
      platformId,
      status,
      progress,
      recommendation,
      mediaType
    );

    return result;
    // console.log(result);
    // return this.findById(result.lastID);
  }

  static async update(
    userId,
    gameId,
    rate,
    platformId,
    status,
    progress,
    recommendation,
    mediaType
  ) {
    await db.run(
      "UPDATE UserGames SET rate = ?, PlatformId = ?, status = ?, progress = ?, recommendation = ?, mediaType = ?, updatedAt = datetime('now') WHERE UserId = ? AND GameId = ?",
      rate,
      platformId,
      status,
      progress,
      recommendation,
      mediaType,
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
