import { z } from "zod";
import { loginSchema } from "../schema/Login/login.schema";

export type ILogin = z.infer<typeof loginSchema>