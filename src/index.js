import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import midtransClient from "midtrans-client";
import productRouter from "./products/product.controller.js";
import userRouter from "./users/users.controller.js";
import authRouter from "./auth/auth.controller.js";
import multer from "multer";

dotenv.config();
const app = express();
const port = 4000;

// middleware
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(express.json());
app.use("/images", express.static("public/images"));
app.use("/products", productRouter);
app.use("/users", userRouter);
app.use("/auth", authRouter);

//inisialisasi snap midtrans
const snap = new midtransClient.Snap({
  // Set to true if you want Production Environment (accept real transaction).
  isProduction: false,
  serverKey: process.env.MIDTRANS_SERVER_KEY,
});

//endpoint genertae token
app.post("/token", async (req, res) => {
  //ambil req body atau parameters yg di kirim
  const { orderId, grossAmount, email, phone, first_name, last_name } =
    req.body;
  console.log("Sending to Midtrans:", {
    order_id: orderId,
    gross_amount: grossAmount,
  });
  try {
    //buat token
    const transaction = await snap.createTransaction({
      transaction_details: {
        order_id: orderId,
        gross_amount: Number(grossAmount),
      },
      credit_card: { secure: true },
      customer_details: {
        first_name,
        last_name,
        email,
        phone,
      },
    });
    console.log(transaction);

    //kirim response token nya
    return res.json({ token: transaction.token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

//middleware error
app.use((err, req, res, next) => {
  console.log(err);
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ error: err.message });
  } else if (err) {
    return res.status(400).json({ error: err.message });
  } else {
    return res.status(err.statusCode || 500).json({ message: err.message });
  }

  next();
});

//jalankan sercer
app.listen(port, () => console.log(`server running in port ${port}`));
