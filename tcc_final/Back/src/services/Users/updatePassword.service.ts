import { hashSync } from "bcrypt";
import { prisma } from "../../app";
import { AppError } from "../../errors";
import { IUpdatePassword } from "../../interfaces/createUser.interface";

export const updatePasswordService = async (data: IUpdatePassword) => {
  const { newPassword } = data;
  const user = await prisma.user.findFirst({
    where: {
      firstName: data.fistName,
      lastName: data.lastName,
    },
  });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  const hashedPassword = hashSync(newPassword, 10);

  const updated = await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      password: hashedPassword,
    },
  });

  return true;
};
