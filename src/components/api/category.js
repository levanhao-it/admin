import axiosClient from "./axiosClient";

const categoryApi = {
  getAll() {
    const url = `/public/categories`;
    return axiosClient.get(url);
  },

  getById(id) {
    const url = `/public/categories/${id}`;
    return axiosClient.get(url);
  },

  add(data) {
    const url = "/admin/categories";
    return axiosClient.post(url, data);
  },

  update(id, data) {
    const url = `/admin/categories/${id}`;
    return axiosClient.put(url, data);
  },

  remove(id) {
    const url = `/admin/products/${id}`;
    return axiosClient.delete(url);
  },
};
export default categoryApi;
