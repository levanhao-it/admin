import axiosClient from "./axiosClient";

const productApi = {
  getAll(params) {
    const url = `/public/products`;
    return axiosClient.get(url, { params });
  },

  getById(id) {
    const url = `/public/products/${id}`;
    return axiosClient.get(url);
  },

  add(data) {
    const url = "/admin/products";
    return axiosClient.post(url, data);
  },

  update(id, data) {
    const url = `/admin/products/${id}`;
    return axiosClient.put(url, data);
  },

  remove(id) {
    const url = `/admin/products/${id}`;
    return axiosClient.delete(url);
  },
};
export default productApi;
