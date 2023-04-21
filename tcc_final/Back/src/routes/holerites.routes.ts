import { verifyTokenMiddleware } from "./../middlewares/verifyToken.middleware";
import { Router } from "express";
import { createHoleriteController } from "../controllers/holerite.controllers";
import { validatedData } from "../middlewares/validatedData.middleware";
import { createHoleriteSchema } from "../schema/Holerites/holerites.schemas";
import { isRhMiddleware } from "../middlewares/isRh.middleware";

const routes = Router();

const holeritesRoutes = () => {
  routes.post(
    "/",
    verifyTokenMiddleware,
    isRhMiddleware,
    validatedData(createHoleriteSchema),
    createHoleriteController
  );

  return routes;
};

export default holeritesRoutes;
