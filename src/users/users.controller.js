import express from "express";
import {
  CreateUser,
  GetAllUser,
  GetEditUser,
  GetUserById,
} from "./users.services.js";

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

router.get("/:id", async (req, res) => {
  //ambil data id dari req params
  const id = req.params.id;
  const user = await GetUserById(Number(id));
  return res.status(200).json({ user });
});

router.get("/", async (req, res) => {
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

export default router;
