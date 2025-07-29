import express from "express";
import {
  getLoginUser,
  getUserRegister,
  getRefreshToken,
} from "./auth.services.js";
import { verifyToken } from "../middleware/verivyToken.js";

const router = express.Router();

router.post("/", async (req, res) => {
  //ambil datd body
  const userData = req.body;

  const userRegister = await getUserRegister(userData);
  return res
    .status(200)
    .json({ message: "berhasil membuat akun", data: userRegister });
});

router.post("/login", async (req, res) => {
  // console.log("ACCESS_TOKEN:", process.env.ACCESS_TOKEN);
  try {
    //ambil body isian
    const userData = req.body;

    const user = await getLoginUser(userData);
    console.log("apa ini", user);

    res.cookie("refreshToken", user.refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      message: "login berhsil",
      data: user.user,
      token: user.accessToken,
    });
  } catch (error) {
    throw new Error(error.message || "something wrond");
  }
});

router.post("/refreshToken", async (req, res) => {
  //ambil refreshtoken dari headers
  const token = req.headers["authorization"];
  const refreshToken = token.split(" ")[1];
  // console.log("ini refreshtoken", refreshToken);

  //genrate accestoken baru berdasar refreshtoken
  const user = await getRefreshToken(refreshToken);

  return res.status(200).json({
    user: user.accessToken,
  });
});

export default router;
