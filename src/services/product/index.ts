import { IProduct } from "constant/interface";
import { API_URL, axiosJwt } from "services/axios";

class ProductService {
  addProduct(params: IProduct) {
    return axiosJwt.post(API_URL + "/changeProduct", { ...params, type: 1 });
  }
  updateProduct(params: IProduct) {
    return axiosJwt.post(API_URL + "/changeProduct", { ...params, type: 2 });
  }
  deleteProduct(params: { id: string | number }) {
    return axiosJwt.post(API_URL + "/changeProduct", { ...params, type: 3 });
  }
  getListProduct = async () => {
    const res = await axiosJwt.post(API_URL + "/getListProduct");
    return res.data.data;
  };
  getListShipment = async (params: { productId: number | string }) => {
    return axiosJwt.post(API_URL + "/getListShipment", params);
  };
  releaseProduct = async (params: {
    id: string | number;
    productId: string | number;
    count: number;
  }) => {
    return axiosJwt.post(API_URL + "/releaseProduct", params);
  };
}

export const productService = new ProductService();
