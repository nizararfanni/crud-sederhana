import express from "express";
import { getLoginUser, getUserRegister } from "./auth.services.js";

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
try {
  //ambil body isian
  const userData = req.body;

  const user = await getLoginUser(userData);
  console.log("apa ini", user);

  return res.status(200).json({
    message: "login berhsil",
    data: user.user,
    token: user.token,
  });
} catch (error) {
  throw new Error(error.message || "something wrond")
}
});

export default router;
