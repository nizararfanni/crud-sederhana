import {
  findUserById,
  loginUser,
  RefreshToken,
  registerUser,
} from "./auth.repository.js";
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
    if (!user) throw new Error("User tidak ditemukan");

    //bandingkan pasword yg ada di db
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) throw new Error("Email atau password salah");

    //genreat e accestoken dan refreshtoken pakw jwt
    const payload = { id: user.id, role: user.role };
    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN, {
      expiresIn: "30s",
    });
    const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN, {
      expiresIn: "1d",
    });
    //simpan reftoken ke db
    await RefreshToken(refreshToken, user.id);

    //kondisikan agar password tdk di kirim di client
    const { password: _, ...safeUser } = user;
    return { user: safeUser, accessToken, refreshToken };
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getRefreshToken = async (refreshToken) => {
  try {
    // Verifikasi refresh token
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN);
    console.log(decoded);

    // Ambil user dari DB berdasarkan ID di token
    const user = await findUserById(decoded.id);
    if (!user) throw new Error("User tidak ditemukan");

    // Generate access token baru
    const payload = { id: user.id, role: user.role };
    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN, {
      expiresIn: "30s",
    });

    return { accessToken };
  } catch (error) {
    throw new Error(error.message || "Refresh token tidak valid atau expired");
  }
};
