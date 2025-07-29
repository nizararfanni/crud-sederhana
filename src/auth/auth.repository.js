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

export const loginUser = async (email) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  return user;
};

export const RefreshToken = async (refreshToken, userId) => {
  const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24);

  const tokenUser = await prisma.refreshToken.create({
    data: {
      token: refreshToken,
      userId,
      expiresAt,
    },
  });

  return tokenUser;
};

export const findUserById = async (id) => {
  return await prisma.user.findUnique({
    where: { id },
  });
};

export const findToken = async (refreshToken) => {
  return await prisma.refreshToken.findUnique({
    where: { token: refreshToken },
    include: { user: true },
  });
};
