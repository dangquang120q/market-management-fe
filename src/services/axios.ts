import axios from "axios";
import showMessage from "components/Message";

export const API_URL = "http://localhost:1337";

export const axiosJwt = axios.create();

axiosJwt.interceptors.response.use(
  function (response) {
    if (response.status == 200 && response.data.data.msg) {
      showMessage("success", response.data.data.msg);
    }

    return response;
  },
  function (error: any) {
    const status = error.response?.status;

    if (status == 500) {
      showMessage("error", "Something bad happened on the server");
    }
    return Promise.reject(error);
  }
);
