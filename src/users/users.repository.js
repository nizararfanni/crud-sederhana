import { prisma } from "../db/index.js";

export const newUsers = async ({ username, email, password, role }) => {
  const user = await prisma.user.create({
    data: {
      username,
      email,
      password,
      role,
    },
  });
  return user;
};

export const AllUser = async () => {
  const users = await prisma.user.findMany({
    select: {
      email: true,
      username: true,
      id: true,
    },
  });
  return users;
};

export const UserProfile = async (userId) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      email: true,
      username: true,
      role: true,
      id: true,
    },
  });
  return user;
};

export const editUser = async (id, updateUser) => {
  const user = await prisma.user.update({
    where: {
      id,
    },
    data: updateUser,
  });
  return user;
};

export const deletedUser = async (id) => {
  const user = await prisma.user.delete({
    where: {
      id,
    },
  });
  return user;
};
