import axios from "axios";
import StorageKeys from "components/constant/storage-keys";
import jwt_decode from "jwt-decode";
import dayjs from "dayjs";
import axiosPrivate from "./axiosPrivate";

const baseURL = "http://localhost:8080/api/";

const axiosClient = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Interceptors
// Add a request interceptor
axiosClient.interceptors.request.use(
  async function (config) {
    // Do something before request is sent
    if (
      config.url.indexOf("/login") >= 0 ||
      config.url.indexOf("/token/refresh") >= 0 ||
      config.url.indexOf("/logout") >= 0
    ) {
      return config;
    }

    const token = localStorage.getItem(StorageKeys.TOKEN) || null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    const user = jwt_decode(token);

    const isExprired = dayjs.unix(user.exp).diff(dayjs()) < 1;
    if (!isExprired) return config;

    try {
      const response = await axiosPrivate.get("token/refresh");
      if (response.status === 200) {
        const newToken = response.data.data.accessToken;
        localStorage.setItem(StorageKeys.TOKEN, newToken);
        config.headers.Authorization = `Bearer ${newToken}`;
      }
    } catch (error) {
      // console.log("loi");
    }

    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Xử lí data sau khi response tu server
axiosClient.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    // console.log(error.reponse);
    const { status, data } = error.response;

    if (status === 400 || status === 404) {
      throw new Error(data.message);
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
