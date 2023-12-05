import { db } from "./sqlite-db.js";

export async function populateDatabase() {
  const hasUsers = await db.get("SELECT * FROM Users");
  const hasGames = await db.get("SELECT * FROM Games");
  const hasPlatforms = await db.get("SELECT * FROM Platforms");
  const hasCategories = await db.get("SELECT * FROM Categories");
  const hasUserGames = await db.get("SELECT * FROM UserGames");
  const hasCategoriesOnGames = await db.get("SELECT * FROM GameCategory");

  if (!hasUsers) {
    await db.run(`
    INSERT INTO Users (username, avatar, email, password, role, createdAt, updatedAt)
    VALUES 
        ('john_doe', 'https://api.lorem.space/image/face?w=150&h=150&hash=1', 'john@example.com', '$2b$10$xe1.5t4Z.mI3UYvdMsx.ouy1Yuqs44dAGkgNoZ2BXxhPDE71tnICu', 'user', datetime('now'), datetime('now')),
        ('jane_smith', 'https://api.lorem.space/image/face?w=150&h=150&hash=2', 'jane@example.com', '$2b$10$xe1.5t4Z.mI3UYvdMsx.ouy1Yuqs44dAGkgNoZ2BXxhPDE71tnICu', 'user', datetime('now'), datetime('now')),
        ('admin1', 'https://api.lorem.space/image/face?w=150&h=150&hash=3', 'admin1@example.com', '$2b$10$xe1.5t4Z.mI3UYvdMsx.ouy1Yuqs44dAGkgNoZ2BXxhPDE71tnICu', 'admin', datetime('now'), datetime('now')),
        ('gamer123', 'https://api.lorem.space/image/face?w=150&h=150&hash=4', 'gamer123@example.com', '$2b$10$xe1.5t4Z.mI3UYvdMsx.ouy1Yuqs44dAGkgNoZ2BXxhPDE71tnICu', 'user', datetime('now'), datetime('now')),
        ('test_user', 'https://api.lorem.space/image/face?w=150&h=150&hash=5', 'test@example.com', '$2b$10$xe1.5t4Z.mI3UYvdMsx.ouy1Yuqs44dAGkgNoZ2BXxhPDE71tnICu', 'user', datetime('now'), datetime('now')),
        ('developer1', 'https://api.lorem.space/image/face?w=150&h=150&hash=6', 'developer1@example.com', '$2b$10$xe1.5t4Z.mI3UYvdMsx.ouy1Yuqs44dAGkgNoZ2BXxhPDE71tnICu', 'developer', datetime('now'), datetime('now')),
        ('player99', 'https://api.lorem.space/image/face?w=150&h=150&hash=7', 'player99@example.com', '$2b$10$xe1.5t4Z.mI3UYvdMsx.ouy1Yuqs44dAGkgNoZ2BXxhPDE71tnICu', 'user', datetime('now'), datetime('now')),
        ('gamingmaster', 'https://api.lorem.space/image/face?w=150&h=150&hash=8', 'master@example.com', '$2b$10$xe1.5t4Z.mI3UYvdMsx.ouy1Yuqs44dAGkgNoZ2BXxhPDE71tnICu', 'user', datetime('now'), datetime('now')),
        ('newuser', 'https://api.lorem.space/image/face?w=150&h=150&hash=9', 'newuser@example.com', '$2b$10$xe1.5t4Z.mI3UYvdMsx.ouy1Yuqs44dAGkgNoZ2BXxhPDE71tnICu', 'user', datetime('now'), datetime('now')),
        ('game_lover', 'https://api.lorem.space/image/face?w=150&h=150&hash=10', 'gamelover@example.com', '$2b$10$xe1.5t4Z.mI3UYvdMsx.ouy1Yuqs44dAGkgNoZ2BXxhPDE71tnICu', 'user', datetime('now'), datetime('now'));
    `);
  }

  if (!hasGames) {
    await db.run(`
    INSERT INTO Games (name, description, image, launchDate, createdAt, updatedAt)
    VALUES
        ('The Witcher 3: Wild Hunt', 'Description for Game1', 'https://api.lorem.space/image/game?hash=1', datetime('2023-01-01'), datetime('now'), datetime('now')),
        ('Grand Theft Auto V', 'Description for Game2', 'https://api.lorem.space/image/game?hash=2', datetime('2022-12-15'), datetime('now'), datetime('now')),
        ('Red Dead Redemption 2', 'Description for Game3', 'https://api.lorem.space/image/game?hash=3', datetime('2023-03-20'), datetime('now'), datetime('now')),
        ('The Legend of Zelda: Breath of the Wild', 'Description for Game4', 'https://api.lorem.space/image/game?hash=4', datetime('2023-05-10'), datetime('now'), datetime('now')),
        ('God of War', 'Description for Game5', 'https://api.lorem.space/image/game?hash=5', datetime('2022-11-05'), datetime('now'), datetime('now')),
        ('Cyberpunk 2077', 'Description for Game6', 'https://api.lorem.space/image/game?hash=6', datetime('2023-07-25'), datetime('now'), datetime('now')),
        ('Assassins Creed Valhalla', 'Description for Game7', 'https://api.lorem.space/image/game?hash=7', datetime('2023-02-14'), datetime('now'), datetime('now')),
        ('FIFA 22', 'Description for Game8', 'https://api.lorem.space/image/game?hash=8', datetime('2023-09-30'), datetime('now'), datetime('now')),
        ('Minecraft', 'Description for Game9', 'https://api.lorem.space/image/game?hash=9', datetime('2022-10-18'), datetime('now'), datetime('now')),
        ('Call of Duty: Warzone', 'Description for Game10', 'https://api.lorem.space/image/game?hash=10', datetime('2023-11-08'), datetime('now'), datetime('now'));
    `);
  }

  if (!hasPlatforms) {
    await db.run(`
    INSERT INTO Platforms (name, description, image, link, createdAt, updatedAt)
    VALUES
        ('Steam', 'Description for Platform1', 'https://cdn.discordapp.com/attachments/1161093871816671243/1181720469473337457/Steam.png?ex=658215f3&is=656fa0f3&hm=b87c59cc5fe295a34a06381caac9235b976b81fb87b5899fbad219dc6366a0f9&', 'https://platform1.com', datetime('now'), datetime('now')),
        ('Playstation', 'Description for Platform2', 'https://cdn.discordapp.com/attachments/1161093871816671243/1181720470366720071/PlayStation.png?ex=658215f3&is=656fa0f3&hm=8b266c2d6ac05150313d0b6957f327d320fb166d7ae4e699f2c6915c620824a9&', 'https://platform2.com', datetime('now'), datetime('now')),
        ('Xbox', 'Description for Platform3', 'https://www.imagensempng.com.br/wp-content/uploads/2023/04/Logo-Xbox-360-Png-1024x1024.png', 'https://platform3.com', datetime('now'), datetime('now')),
        ('Epic Games', 'Description for Platform4', 'https://cdn.discordapp.com/attachments/1161093871816671243/1181720469947285554/Epic_Games.png?ex=658215f3&is=656fa0f3&hm=8a2ad23877bd6a035b2fa03f22cb1ff4715f289c75b6bfc8b49822df4f18086e&', 'https://platform4.com', datetime('now'), datetime('now')),
        ('Playstore', 'Description for Platform5', 'https://cdn.discordapp.com/attachments/1161093871816671243/1181720470161203200/Google_Play_Store.png?ex=658215f3&is=656fa0f3&hm=c372f10a7f0a485b9a0a2c1c763df16d7def7ae6a679f515bb33dd5bccfbed32&', 'https://platform5.com', datetime('now'), datetime('now')),
        ('Eletronic Arts', 'Description for Platform6', 'https://cdn.discordapp.com/attachments/1161093871816671243/1181720469708214322/10-2-electronic-arts-png_1.png?ex=658215f3&is=656fa0f3&hm=013c061a6327935d1aebc42dfc2f761c9970e974429b8480eeab7f2de7fcc336&', 'https://platform6.com', datetime('now'), datetime('now')),
        ('Platform7', 'Description for Platform7', 'https://api.lorem.space/image/game?hash=107.jpg', 'https://platform7.com', datetime('now'), datetime('now')),
        ('Platform8', 'Description for Platform8', 'https://api.lorem.space/image/game?hash=108.jpg', 'https://platform8.com', datetime('now'), datetime('now')),
        ('Platform9', 'Description for Platform9', 'https://api.lorem.space/image/game?hash=109.jpg', 'https://platform9.com', datetime('now'), datetime('now')),
        ('Platform10', 'Description for Platform10', 'https://api.lorem.space/image/game?hash=1010.jpg', 'https://platform10.com', datetime('now'), datetime('now'));
    `);
  }

  if (!hasCategories) {
    await db.run(`
    INSERT INTO Categories (name, description, createdAt, updatedAt)
    VALUES
        ('RPG', 'Role-playing games', datetime('now'), datetime('now')),
        ('Action', 'Action-packed games', datetime('now'), datetime('now')),
        ('Adventure', 'Adventure-driven games', datetime('now'), datetime('now')),
        ('Sports', 'Sports-themed games', datetime('now'), datetime('now')),
        ('Simulation', 'Simulation-based games', datetime('now'), datetime('now')),
        ('Strategy', 'Strategic games', datetime('now'), datetime('now')),
        ('Puzzle', 'Puzzle-solving games', datetime('now'), datetime('now')),
        ('Horror', 'Horror-themed games', datetime('now'), datetime('now')),
        ('Fighting', 'Fighting games', datetime('now'), datetime('now')),
        ('Shooter', 'Shooting games', datetime('now'), datetime('now'));
    `);
  }

  if (!hasUserGames) {
    await db.run(`
    INSERT INTO UserGames (rate, status, progress, recommendation, mediaType, createdAt, updatedAt, PlatformId, UserId, GameId)
    VALUES
        (4.5, 'Jogando', 30, 'Great game!', 'Physical', datetime('now'), datetime('now'), 1, 1, 1),
        (3.8, 'Jogado', 10, 'Waiting to play', 'Digital', datetime('now'), datetime('now'), 2, 2, 3),
        (5.0, 'Zerado', 100, 'Highly recommended', 'Physical', datetime('now'), datetime('now'), 3, 3, 2),
        (4.2, 'Jogando', 50, 'Enjoying it', 'Physical', datetime('now'), datetime('now'), 1, 4, 4),
        (4.7, 'Zerado', 90, 'Fantastic experience', 'Digital', datetime('now'), datetime('now'), 2, 5, 5),
        (3.5, 'Jogado', 20, 'Havent started yet', 'Physical', datetime('now'), datetime('now'), 3, 6, 6),
        (4.0, 'Jogando', 40, 'Challenging but fun', 'Digital', datetime('now'), datetime('now'), 1, 7, 7),
        (4.9, 'Zerado', 100, 'Amazing game!', 'Physical', datetime('now'), datetime('now'), 2, 8, 8),
        (4.6, 'Jogando', 60, 'Addictive gameplay', 'Digital', datetime('now'), datetime('now'), 3, 9, 9),
        (3.9, 'Jogado', 15, 'Planning to play soon', 'Physical', datetime('now'), datetime('now'), 1, 10, 10);
    `);
  }

  if (!hasCategoriesOnGames) {
    await db.run(`
INSERT INTO GameCategory (createdAt, updatedAt, GameId, CategoryId)
VALUES 
    (datetime('now'), datetime('now'), 1, 1),
    (datetime('now'), datetime('now'), 1, 3),
    (datetime('now'), datetime('now'), 1, 8),
    (datetime('now'), datetime('now'), 2, 2),
    (datetime('now'), datetime('now'), 2, 3),
    (datetime('now'), datetime('now'), 2, 9),
    (datetime('now'), datetime('now'), 3, 2),
    (datetime('now'), datetime('now'), 3, 3),
    (datetime('now'), datetime('now'), 3, 8),
    (datetime('now'), datetime('now'), 4, 2),
    (datetime('now'), datetime('now'), 4, 3),
    (datetime('now'), datetime('now'), 5, 2),
    (datetime('now'), datetime('now'), 5, 3),
    (datetime('now'), datetime('now'), 5, 9),
    (datetime('now'), datetime('now'), 6, 2),
    (datetime('now'), datetime('now'), 6, 3),
    (datetime('now'), datetime('now'), 6, 6),
    (datetime('now'), datetime('now'), 7, 2),
    (datetime('now'), datetime('now'), 7, 3),
    (datetime('now'), datetime('now'), 7, 6),
    (datetime('now'), datetime('now'), 8, 4);
    `);
  }
}
