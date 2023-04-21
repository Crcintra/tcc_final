import { loginSchema } from "./../schema/Login/login.schema";
import { Router } from "express";
import { validatedData } from "../middlewares/validatedData.middleware";
import { loginController } from "../controllers/login.controller";

const routes = Router();

const loginRoutes = () => {
  routes.post("/", validatedData(loginSchema), loginController);

  return routes;
};

export default loginRoutes;
