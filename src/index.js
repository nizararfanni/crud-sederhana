import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import midtransClient from "midtrans-client";
import router from "./products/product.controller.js";

dotenv.config();
const app = express();
const port = 4000;

// middleware
app.use(
  cors({
    origin: "http://localhost:4000",
  })
);
app.use(express.json());
app.use("/products", router);

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

//jalankan sercer
app.listen(port, () => console.log(`server running in port ${port}`));
