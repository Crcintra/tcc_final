import usersRoutes from "./users.routes";
import { Express } from "express";
import loginRoutes from "./login.routes";
import holeritesRoutes from "./holerites.routes";

export const appRoutes = (app: Express) => {
  app.use("/users", usersRoutes());
  app.use("/login", loginRoutes());
  app.use("/holerites", holeritesRoutes());
};
