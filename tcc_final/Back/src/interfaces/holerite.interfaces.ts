import { z } from "zod";
import { createHoleriteSchema } from "../schema/Holerites/holerites.schemas";

export type ICreateHolerite = z.infer<typeof createHoleriteSchema>;
