import { loginUser, registerUser } from "./auth.repository.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const getUserRegister = async (userData) => {
  try {
    //hashing password dulu
    const hashedPasswrod = await bcrypt.hash(userData.password, 10);
    const user = await registerUser({ ...userData, password: hashedPasswrod });
    if (!user) throw new Error("gagal membuat account");

    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getLoginUser = async ({ email, password }) => {
try {
    const user = await loginUser(email);
    if (!user) throw new Error("user tidak di temukan");

    //compare passwrod dengan yg ada di database
    const isMatchedPasswrod = await bcrypt.compare(password,user.password);
    if (!isMatchedPasswrod) throw new Error("username atau password salah");

    //kirim jwt token
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.ACCES_TOKEN,
      {
        expiresIn: "30s",
      }
    );

    //buat ahar tidak mengembalikan password ke clent
    const { password: _, ...safeUser } = user;
    console.log(safeUser);
    return { user: safeUser, token };
} catch (error) {
  throw new Error(error.message)
}
};
