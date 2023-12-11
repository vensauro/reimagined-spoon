import express from "express";
import { register } from "./register.js";
import { wrap } from "../../utils/express-promise.js";
import { login } from "./login.js";
import { getLoggedUser } from "./get-logged-user.js";
import { authentication } from "../../utils/auth-middleware.js";
import { updateProfile } from "./update-profile.js";
import { deleteUser } from "./delete-profile.js";

export const authRouter = express.Router();

authRouter.post("/register", wrap(register));
authRouter.post("/login", wrap(login));
authRouter.get("/me", authentication, wrap(getLoggedUser));
authRouter.put("/me", authentication, wrap(updateProfile));
authRouter.delete("/me", authentication, wrap(deleteUser));
