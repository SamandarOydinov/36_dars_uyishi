import { toast } from "react-toastify"
import instance from "./instance";

export const getCategoriesApi = async () => {
    try {
        const res = await instance.get('/e-commerce/categories');
        return res.data;
    } catch (e) {
        toast.error(`Failed to fetch Categories!`);
    }
}