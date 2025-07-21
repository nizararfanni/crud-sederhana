import { prisma } from "../db/index.js";

export const CreateNewProducts = async (productData) => {
  const product = await prisma.products.create({
    data: {
      name: productData.name,
      email: productData.email,
      images: productData.images,
      price: productData.price,
      description: productData.description,
      stock: productData.stock,
    },
  });
  return product;
};

export const findProducts = async () => {
  const product = await prisma.products.findMany();
  return product;
};

export const findProductById = async (id) => {
  const product = await prisma.products.findFirst({
    where: {
      id,
    },
  });

  return product;
};

export const DeletedProduct = async (id) => {
  const product = await prisma.products.delete({
    where: {
      id,
    },
  });
  return product;
};

export const UpdatedProduct = async (id, productData) => {
  const product = await prisma.products.update({
    where: {
      id,
    },
    data: {
      name: productData.name,
      email: productData.email,
      images: productData.images,
      price: productData.price,
      description: productData.description,
      stock: productData.stock,
    },
  });

  return product;
};
