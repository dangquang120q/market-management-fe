import { IReceipt } from "constant/interface";
import { API_URL, axiosJwt } from "services/axios";

class ReceiptService {
  createReceipt(params: IReceipt) {
    return axiosJwt.post(API_URL + "/createReceipt", params);
  }
  getListReceipt = async () => {
    const res = await axiosJwt.post(API_URL + "/getListReceipt");
    return res.data.data;
  };
  getReceiptById = async (params: { id: string }) => {
    const res = await axiosJwt.post(API_URL + "/getReceipt", params);
    return res.data.data;
  };
}

export const receiptService = new ReceiptService();
