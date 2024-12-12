import { IPromoProduct, IPromotional } from "constant/interface";
import { API_URL, axiosJwt } from "services/axios";

class PromotionalService {
  addPromotional(params: IPromotional) {
    return axiosJwt.post(API_URL + "/changePromotional", {
      ...params,
      type: 1,
    });
  }
  updatePromotional(params: IPromotional) {
    return axiosJwt.post(API_URL + "/changePromotional", {
      ...params,
      type: 2,
    });
  }
  deletePromotional(params: { id: string | number }) {
    return axiosJwt.post(API_URL + "/changePromotional", {
      ...params,
      type: 3,
    });
  }
  getListPromotional = async () => {
    const res = await axiosJwt.post(API_URL + "/getListPromotional");
    return res.data.data;
  };
  addProductPromotional(params: IPromoProduct) {
    return axiosJwt.post(API_URL + "/changeProductPromotional", {
      ...params,
      type: 1,
    });
  }
  updateProductPromotional(params: IPromoProduct) {
    return axiosJwt.post(API_URL + "/changeProductPromotional", {
      ...params,
      type: 2,
    });
  }
  deleteProductPromotional(params: { id: string | number }) {
    return axiosJwt.post(API_URL + "/changeProductPromotional", {
      ...params,
      type: 3,
    });
  }
  getListProductPromotional = async (params: { id: string | number }) => {
    const res = await axiosJwt.post(
      API_URL + "/getListProductPromotional",
      params
    );
    return res.data.data;
  };
}

export const promotionalService = new PromotionalService();
