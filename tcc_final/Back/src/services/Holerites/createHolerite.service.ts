import { prisma } from "../../app";
import { AppError } from "../../errors";
import { ICreateHolerite } from "../../interfaces/holerite.interfaces";
import { holeriteSchema } from "../../schema/Holerites/holerites.schemas";

export const createHoleriteService = async (data: ICreateHolerite) => {
  const user = await prisma.user.findUnique({
    where: {
      id: data.userId,
    },
  });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  const holerite = await prisma.holerite.create({ data });

  return holeriteSchema.parse(holerite);
};
