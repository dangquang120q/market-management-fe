import { IBooth } from "constant/interface";
import { API_URL, axiosJwt } from "services/axios";

class BoothService {
  addBooth(params: IBooth) {
    return axiosJwt.post(API_URL + "/changeBooth", { ...params, type: 1 });
  }
  updateBooth(params: IBooth) {
    return axiosJwt.post(API_URL + "/changeBooth", { ...params, type: 2 });
  }
  deleteBooth(params: { id: string | number }) {
    return axiosJwt.post(API_URL + "/changeBooth", { ...params, type: 3 });
  }
  getListBooth = async () => {
    const res = await axiosJwt.post(API_URL + "/getListBooth");
    return res.data.data;
  };
}

export const boothService = new BoothService();
