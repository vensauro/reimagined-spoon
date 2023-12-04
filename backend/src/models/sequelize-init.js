import { Sequelize, DataTypes } from "sequelize";

export const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite",
});

const User = sequelize.define("User", {
  username: DataTypes.STRING,
  avatar: DataTypes.STRING,
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
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  rate: {
    type: DataTypes.NUMBER,
    allowNull: true,
  },
});

Platform.hasMany(Game);
Game.belongsTo(Platform);

User.belongsToMany(Game, { through: UserGame });
Game.belongsToMany(User, { through: UserGame });

UserGame.belongsToMany(Category, { through: "UserGameCategory" });
Category.belongsToMany(UserGame, { through: "UserGameCategory" });
