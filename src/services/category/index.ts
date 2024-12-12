import { ICategory } from "constant/interface";
import { API_URL, axiosJwt } from "services/axios";

class CategoryService {
  addCategory(params: ICategory) {
    return axiosJwt.post(API_URL + "/changeCategory", { ...params, type: 1 });
  }
  updateCategory(params: ICategory) {
    return axiosJwt.post(API_URL + "/changeCategory", { ...params, type: 2 });
  }
  deleteCategory(params: { id: string | number }) {
    return axiosJwt.post(API_URL + "/changeCategory", { ...params, type: 3 });
  }
  getListCategory = async () => {
    const res = await axiosJwt.post(API_URL + "/getListCategory");
    return res.data.data;
  };
}

export const categoryService = new CategoryService();
