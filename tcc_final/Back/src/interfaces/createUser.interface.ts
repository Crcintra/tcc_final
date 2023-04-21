import { z } from "zod";
import {
  createUserSchema,
  responseAllUsersSchema,
  UpdatePasswordSchema,
} from "../schema/Users/createUser.schema";

export type ICreateUser = z.infer<typeof createUserSchema>;

export type ICreateUserResponse = z.infer<typeof responseAllUsersSchema>;

export type IUpdatePassword = z.infer<typeof UpdatePasswordSchema>;
