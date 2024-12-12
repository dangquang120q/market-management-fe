import { IInvoice } from "constant/interface";
import { API_URL, axiosJwt } from "services/axios";

class InvoiceService {
  createInvoice(params: IInvoice) {
    return axiosJwt.post(API_URL + "/createInvoice", params);
  }
  getListInvoice = async () => {
    const res = await axiosJwt.post(API_URL + "/getListInvoice");

    return res.data.data;
  };
  getInvoiceById = async (params: { id: string }) => {
    const res = await axiosJwt.post(API_URL + "/getInvoice", params);
    return res.data.data;
  };
}

export const invoiceService = new InvoiceService();
