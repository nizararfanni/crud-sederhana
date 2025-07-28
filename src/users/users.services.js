import {
  AllUser,
  deletedUser,
  editUser,
  newUsers,
  UserById,
} from "./users.repository.js";
import bcrypt from "bcrypt";

export const CreateUser = async (userData) => {
  try {
    //hashed pasword dlu
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const user = await newUsers({ ...userData, password: hashedPassword });
    if (!user) throw new Error("Gagal membuat user");
    return user;
  } catch (error) {
    throw new Error(error.message || "Terjadi kesalahan saat membuat user");
  }
};

export const GetUserById = async (id) => {
  try {
    const user = await UserById(id);
    if (!user) throw new Error("User tidak ditemukan");
    return user;
  } catch (error) {
    throw new Error( error.message || "something wrong" );
  }
};

export const GetAllUser = async () => {
  try {
    const users = await AllUser();
    if (!users) throw new Error("something wrong 1");
    return users;
  } catch (error) {
    throw new Error("something gone Wrong" || error.message);
  }
};

export const GetEditUser = async (id, updateUser) => {
  try {
    const user = await editUser(id, updateUser);
    if (!user) throw new Error("user tidaj di temukan");
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const GetDeteltedUser = async (id) => {
  try {
    const user = await deletedUser(id);
    if (!user) throw new Error("user tidak di temukan");
    return user;
  } catch (error) {
    throw new Error("user tidak di temukan" || error.message );
  }
};
