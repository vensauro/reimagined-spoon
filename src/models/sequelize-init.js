import { Sequelize, DataTypes } from "sequelize";

export const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite",
});

const User = sequelize.define("User", {
  username: DataTypes.STRING,
  email: {
    type: DataTypes.STRING,
    unique: true,
  },
  password: DataTypes.STRING,
  role: DataTypes.STRING,
});

const Game = sequelize.define("Game", {
  name: DataTypes.STRING,
  description: DataTypes.STRING,
  image: DataTypes.STRING,
});

const Platform = sequelize.define("Platform", {
  name: DataTypes.STRING,
  description: DataTypes.STRING,
  image: DataTypes.STRING,
  link: DataTypes.STRING,
});

const Category = sequelize.define("Category", {
  name: DataTypes.STRING,
  description: DataTypes.STRING,
});

const UserGame = sequelize.define("UserGame", {
  rate: DataTypes.NUMBER,
});

Platform.hasMany(Game);
Game.belongsTo(Platform);

User.belongsToMany(Game, { through: UserGame });
Game.belongsToMany(User, { through: UserGame });

UserGame.belongsToMany(Category, { through: "UserGameCategory" });
Category.belongsToMany(UserGame, { through: "UserGameCategory" });
