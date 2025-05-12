import instance from "./instance";
import { toast } from "react-toastify";

export const getProductByIdApi = async (id) => {
  try {
    const res = await instance.get(`/e-commerce/products/${id}`);
    return res.data;
  } catch (e) {
    toast.error("Failed to fetch product by ID!");
  }
};