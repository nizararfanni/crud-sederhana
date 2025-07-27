import { prisma } from "../db/index.js";

export const registerUser = async ({ email, password, username }) => {
  const user = await prisma.user.create({
    data: {
      email,
      password,
      username,
    },
  });
  return user;
};

export const loginUser = async (email ) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  return user;
};
