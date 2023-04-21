import { prisma } from "../../app";
import { AppError } from "../../errors";
import { userDetailSchema } from "../../schema/Users/createUser.schema";

export const listUserDetailService = async (id: number) => {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
    include: {
      holerite: true,
    },
  });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  return userDetailSchema.parse(user);
};
