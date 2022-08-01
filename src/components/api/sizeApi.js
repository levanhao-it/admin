import axiosClient from "./axiosClient";

const sizeApi = {
  getAll() {
    const url = `/public/sizes`;
    return axiosClient.get(url);
  },

  getById(id) {
    const url = `/public/sizes/${id}`;
    return axiosClient.get(url);
  },

  add(data) {
    const url = "/admin/sizes";
    return axiosClient.post(url, data);
  },

  update(id, data) {
    const url = `/admin/sizes/${id}`;
    return axiosClient.put(url, data);
  },

  remove(id) {
    const url = `/admin/sizes/${id}`;
    return axiosClient.delete(url);
  },
};
export default sizeApi;
