import { GameSequelize } from "./game.js";
import { UserSequelize } from "./user.js";

export async function sequelizeSync(force = false) {
  await UserSequelize.sync({ force });
  await GameSequelize.sync({ force });
}
