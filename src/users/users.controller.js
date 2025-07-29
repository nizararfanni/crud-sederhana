import express from "express";
import {
  CreateUser,
  GetAllUser,
  GetDeteltedUser,
  GetEditUser,
  GetUserProfile,
} from "./users.services.js";
import { verifyToken } from "../middleware/verivyToken.js";

const router = express.Router();

router.post("/", async (req, res) => {
  //ambil isi body yg di kirim user\
  const userData = req.body;
  const user = await CreateUser(userData);

  //balikin response kalo login berhasil
  return res.status(200).json({
    message: "berhasil embuat akun",
    data: user,
  });
});

router.get("/profile", verifyToken, async (req, res) => {
  //ambil injekan req di verivy token
  const userId = req.user.id;
  const user = await GetUserProfile(Number(userId));
  return res.status(200).json({ user });
});

router.get("/", verifyToken, async (req, res) => {
  const users = await GetAllUser();
  return res.status(200).json({ data: users });
});

router.patch("/:id", async (req, res) => {
  ///ambil id
  const id = req.params.id;
  //ambil isian bdoy
  const updateUser = req.body;

  const user = await GetEditUser(Number(id), updateUser);
  return res.status(200).json({ message: "berhasil update data", data: user });
});

router.delete("/:id", async (req, res) => {
  //ambil id dari parasm
  const id = req.params.id;
  const user = await GetDeteltedUser(Number(id));
  return res
    .status(200)
    .json({ message: "user berhasil di hapus", data: user });
});

export default router;
