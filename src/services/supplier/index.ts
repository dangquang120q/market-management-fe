import { ISupplier } from "constant/interface";
import { API_URL, axiosJwt } from "services/axios";

class SupplierService {
  addSupplier(params: ISupplier) {
    return axiosJwt.post(API_URL + "/changeSupplier", { ...params, type: 1 });
  }
  updateSupplier(params: ISupplier) {
    return axiosJwt.post(API_URL + "/changeSupplier", { ...params, type: 2 });
  }
  deleteSupplier(params: { id: string | number }) {
    return axiosJwt.post(API_URL + "/changeSupplier", { ...params, type: 3 });
  }
  getListSupplier = async () => {
    const res = await axiosJwt.post(API_URL + "/getListSupplier");
    return res.data.data;
  };
}

export const supplierService = new SupplierService();
