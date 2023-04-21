import { z } from "zod";

export const holeriteSchema = z.object({
  id: z.number(),
  currentMonth: z.string(),
  bruteSalary: z.number(),
  inssValue: z.number(),
  foodValue: z.number(),
  healthyValue: z.number(),
  userId: z.number(),
});

export const createHoleriteSchema = holeriteSchema.omit({
  id: true,
});

export const holeriteWithoutUserIdSchema = holeriteSchema.omit({
  userId: true
})
