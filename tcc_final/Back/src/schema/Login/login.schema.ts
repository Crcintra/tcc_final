import { z } from "zod";

export const loginSchema = z.object({
  firstName: z.string(),
  password: z.string(),
});
