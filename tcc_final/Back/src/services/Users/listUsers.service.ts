import { prisma } from "../../app";
import { responseAllUsersSchema } from "../../schema/Users/createUser.schema";

export const listUsersService = async () => {
  const users = await prisma.user.findMany({
    include: {
      holerite: true,
    },
  });

  return responseAllUsersSchema.parse(users);
};
