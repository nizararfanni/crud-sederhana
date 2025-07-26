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

export const UserById = async (id) => {
  const user = await prisma.user.findUnique({
    where: {
      id,
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
