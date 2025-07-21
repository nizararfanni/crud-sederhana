import express from "express";
import {
  getAllProducts,
  GetDeletedProduct,
  getProductById,
  GetUpdateProduct,
} from "./product.services.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const products = await getAllProducts();
  return res.json({ message: "semua products", products });
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const product = await getProductById(parseInt(id));
  return res.json({
    message: `ini product yg anda minta sesuai ${id}`,
    product,
  });
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  const product = await GetDeletedProduct(parseInt(id));

  return res.json({ message: "products has been deleted ", product });
});

router.put("/:id", async (req, res) => {
  //ambil id dr paramd
  const id = req.params.id;
  //ambil data dr body
  const productData = req.body;
  console.log(req.body);

  const updateProduct = await GetUpdateProduct(parseInt(id), productData);
  return res.json({ message: "products has been updated", updateProduct });
});

export default router;
