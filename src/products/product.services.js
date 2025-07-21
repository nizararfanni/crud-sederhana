import {
  CreateNewProducts,
  DeletedProduct,
  findProductById,
  findProducts,
  UpdatedProduct,
} from "./product.repository.js";

export const AddNewProducst = async (productData) => {
  try {
    const product = await CreateNewProducts(productData);
    if (!product || product.length < 0) throw new Error("produk harus di isi");
    return product;
  } catch (error) {
    throw new Error(error.message || "produk harus di isi 2");
  }
};

export const getAllProducts = async () => {
  const products = await findProducts();
  return products;
};

export const getProductById = async (id) => {
  try {
    const product = await findProductById(id);
    if (!product) {
      throw new Error("products not found");
    }
    return product;
  } catch (error) {
    throw error.message;
  }
};

export const GetDeletedProduct = async (id) => {
  try {
    //validasi ada produk terlebih dahulu
    await getProductById(id);

    //deteled products yb id
    const product = await DeletedProduct(id);
    return product;
  } catch (error) {
    throw new Error(error.message || "produk yg di cari tidak ada");
  }
};

export const GetUpdateProduct = async (id, productData) => {
  //validai ada product yg tersedia
  try {
    await getProductById(id);
    const newProduct = await UpdatedProduct(id, productData);
    return newProduct;
  } catch (error) {
    throw new Error(error.message || "products yg mau di edit tidak ada");
  }
};
