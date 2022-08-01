import axiosClient from "./axiosClient";

const colorApi = {
  getAll() {
    const url = `/public/colors`;
    return axiosClient.get(url);
  },

  getById(id) {
    const url = `/public/colors/${id}`;
    return axiosClient.get(url);
  },

  add(data) {
    const url = "/admin/colors";
    return axiosClient.post(url, data);
  },

  update(id, data) {
    const url = `/admin/colors/${id}`;
    return axiosClient.put(url, data);
  },

  remove(id) {
    const url = `/admin/products/${id}`;
    return axiosClient.delete(url);
  },
};
export default colorApi;
