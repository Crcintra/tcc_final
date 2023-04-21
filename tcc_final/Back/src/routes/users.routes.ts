import { verifyTokenMiddleware } from "./../middlewares/verifyToken.middleware";
import { Router } from "express";
import {
  createUserController,
  listUserDetailController,
  listUserProfileController,
  listUsersController,
  updatePasswordController,
} from "../controllers/users.controllers";
import { validatedData } from "../middlewares/validatedData.middleware";
import { createUserSchema } from "../schema/Users/createUser.schema";
import { isRhMiddleware } from "../middlewares/isRh.middleware";

const routes = Router();

const usersRoutes = () => {
  routes.post("/", validatedData(createUserSchema), createUserController);
  routes.get("/", verifyTokenMiddleware, isRhMiddleware, listUsersController);
  routes.get("/profile", verifyTokenMiddleware, listUserProfileController);
  routes.get(
    "/:id",
    verifyTokenMiddleware,
    isRhMiddleware,
    listUserDetailController
  );

  routes.patch(
    "/newPassword",
    updatePasswordController
  );

  return routes;
};

export default usersRoutes;
