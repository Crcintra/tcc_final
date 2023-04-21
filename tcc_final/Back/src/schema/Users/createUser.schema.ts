import { z } from "zod";
import { holeriteWithoutUserIdSchema } from "../Holerites/holerites.schemas";

export const userSchema = z.object({
  id: z.number(),
  firstName: z.string(),
  lastName: z.string(),
  password: z.string(),
  enrollDate: z.date(),
  birthDate: z.date(),
  isRh: z.boolean(),
  cpf: z.string(),
  phone: z.string(),
  state: z.string(),
  city: z.string(),
});

export const createUserSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  password: z.string(),
  enrollDate: z.string(),
  birthDate: z.string(),
  isRh: z.boolean(),
  cpf: z.string(),
  phone: z.string(),
  state: z.string(),
  city: z.string(),
});

export const responseUserSchema = userSchema.omit({ password: true });

export const responseAllUsersSchema = z.array(responseUserSchema);

export const userDetailSchema = userSchema
  .extend({
    holerite: z.array(holeriteWithoutUserIdSchema),
  })
  .omit({ password: true });

export const UpdatePasswordSchema = z.object({
  fistName: z.string(),
  lastName: z.string(),
  newPassword: z.string(),
});
