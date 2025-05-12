import { toast } from "react-toastify";
import instance from "./instance";

export const getProductsApi = async () => {
  try {
    const res = await instance.get(`/e-commerce/products`);
    return res.data;
  } catch (error) {
    toast.error("failed to fetch products");
  }
};

export const getProductByIdApi = async (id) => {
  try {
    const res = await instance.get(`/e-commerce/products/${id}`);
    return res.data;
  } catch (error) {
    toast.error("Failed to fetch product by ID!");
  }
};

export const getProductsByCategoryApi = async (params) => {
  try {
    const res = await instance.get(
      `/e-commerce/products?category=${params.category}`
    );
    return res.data;
  } catch (e) {
    toast.error(`Failed to fetch Products!`);
  }
};
