import axios from "axios";
import StorageKeys from "components/constant/storage-keys";
import axiosClient from "./axiosClient";

const baseURL = "http://localhost:8080/api/";

const axiosPrivate = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

axiosPrivate.interceptors.response.use(
  function (response) {
    console.log(response);
    return response;
  },
  async function (error) {
    const { status } = error.response;
    if (status === 401) {
      localStorage.removeItem(StorageKeys.TOKEN);
      localStorage.removeItem(StorageKeys.USER);
      window.location.pathname = "/login";
      await axiosClient.get("/logout");
    }
    return Promise.reject(error);
  }
);

export default axiosPrivate;
