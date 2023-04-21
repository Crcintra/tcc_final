import { Request, Response } from "express";
import { createUserService } from "../services/Users/createUser.service";
import { listUserDetailService } from "../services/Users/listUserDetail.service";
import { listUsersService } from "../services/Users/listUsers.service";
import { updatePasswordService } from "../services/Users/updatePassword.service";

export const createUserController = async (
  request: Request,
  response: Response
) => {
  const userData = request.body;

  const newUser = await createUserService(userData);

  return response.status(201).json(newUser);
};

export const listUsersController = async (request: Request, response: Response) => {
  const users = await listUsersService();

  return response.json(users);
};

export const listUserDetailController = async (
  request: Request,
  response: Response
) => {
  const { id } = request.params;

  const userDetail = await listUserDetailService(+id);

  return response.json(userDetail);
};

export const listUserProfileController = async (
  request: Request,
  response: Response
) => {
  const { id } = request.user;

  const userDetail = await listUserDetailService(+id);

  return response.json(userDetail);
};

export const updatePasswordController = async (
  request: Request,
  response: Response
) => {
  const data = request.body;

  const updated = await updatePasswordService(data);

  return response.json({ message: "password atualizado com sucesso" });
};
