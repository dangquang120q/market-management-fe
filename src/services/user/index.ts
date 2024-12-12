import { IStaff } from "constant/interface";
import { API_URL, axiosJwt } from "services/axios";

class UserService {
  addStaff(params: IStaff) {
    return axiosJwt.post(API_URL + "/changeStaff", { ...params, type: 1 });
  }
  updateStaff(params: IStaff) {
    return axiosJwt.post(API_URL + "/changeStaff", { ...params, type: 2 });
  }
  deleteStaff(params: { id: string | number }) {
    return axiosJwt.post(API_URL + "/changeStaff", { ...params, type: 3 });
  }
  getListStaff = async () => {
    const res = await axiosJwt.post(API_URL + "/getListStaff");
    return res.data.data;
  };
  login(params: { username: string; password: string }) {
    return axiosJwt.post(API_URL + "/login", params);
  }
}

export const userService = new UserService();
