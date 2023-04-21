import { prisma } from "../../app";
import { hashSync } from "bcrypt";

import { responseUserSchema } from "../../schema/Users/createUser.schema";
import { AppError } from "../../errors";
import { ICreateUser } from "../../interfaces/createUser.interface";

export const createUserService = async (data: ICreateUser) => {
  const { password, enrollDate, birthDate } = data;

  const enrollDateFormated = new Date(enrollDate);
  const birthDateFormated = new Date(birthDate);

  const findUser = await prisma.user.findFirst({
    where: {
      firstName: data.firstName,
      lastName: data.lastName,
    },
  });

  if (findUser) {
    throw new AppError("User already exists", 409);
  }

  const hashedPassword = hashSync(password, 10);

  const newUser = await prisma.user.create({
    data: {
      ...data,
      password: hashedPassword,
      enrollDate: enrollDateFormated,
      birthDate: birthDateFormated,
    },
  });

  return responseUserSchema.parse(newUser);
};
