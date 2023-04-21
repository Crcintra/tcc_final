import { prisma } from "../../app";
import { AppError } from "../../errors";
import { ILogin } from "../../interfaces/login.interface";
import { compareSync } from "bcrypt";
import * as jwt from "jsonwebtoken";

export const loginService = async (data: ILogin) => {
  const user = await prisma.user.findFirst({
    where: {
      firstName: data.firstName,
    },
  });
  if (!user) {
    throw new AppError("name or password is wrong", 400);
  }

  const verifyPassword = compareSync(data.password, user.password);

  if (!verifyPassword) {
    throw new AppError("name or password is wrong", 400);
  }

  const token = jwt.sign(
    {
      isRh: user.isRh,
      id: user.id,
    },
    process.env.SECRET_KEY!,
    {
      expiresIn: "24h",
    }
  );

  return { token, id: user.id, isRh: user.isRh };
};
