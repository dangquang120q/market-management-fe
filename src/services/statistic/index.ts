import { API_URL, axiosJwt } from "services/axios";

class StatiticsService {
  productStatistics(params: { type: number }) {
    return axiosJwt.post(API_URL + "/productStatistics", params);
  }
  revenueStatistic(params: {
    type: number;
    startDate?: string;
    endDate?: string;
  }) {
    return axiosJwt.post(API_URL + "/statistics", params);
  }
  getListExcessProduct() {
    return axiosJwt.post(API_URL + "/getListExcessProduct");
  }
  cancelProductReceipt(params: {
    id: number | string;
    productId: number | string;
    remain: number;
  }) {
    return axiosJwt.post(API_URL + "/cancelProduct", params);
  }
  getListCancel() {
    return axiosJwt.post(API_URL + "/getListCancel");
  }
}

export const statiticsService = new StatiticsService();
