import axiosClient from "./axiosClient";

const orderApi = {
  getById(id) {
    const url = `/admin/orders/${id}`;
    return axiosClient.get(url);
  },

  getAll() {
    const url = `/admin/orders/list`;
    return axiosClient.get(url);
  },

  update(id, data) {
    const url = `/admin/orders/${id}`;
    return axiosClient.put(url, data);
  },
};
export default orderApi;
