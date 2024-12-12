import { IMember } from "constant/interface";
import { API_URL, axiosJwt } from "services/axios";

class MemberService {
  addMember(params: IMember) {
    return axiosJwt.post(API_URL + "/addMember", params);
  }
  updateMember(params: IMember) {
    return axiosJwt.post(API_URL + "/updateMember", params);
  }
  deleteMember(params: { id: string }) {
    return axiosJwt.post(API_URL + "/deleteMember", params);
  }
  getListMember = async () => {
    const res = await axiosJwt.post(API_URL + "/getListMember");
    return res.data.data;
  };
}

export const memberService = new MemberService();
