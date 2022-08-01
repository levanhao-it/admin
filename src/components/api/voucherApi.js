import axiosClient from "./axiosClient";

const voucherApi = {
  getAll() {
    const url = `/admin/vouchers`;
    return axiosClient.get(url);
  },

  getById(id) {
    const url = `/admin/voucher/${id}`;
    return axiosClient.get(url);
  },

  add(data) {
    const url = "/admin/vouchers";
    return axiosClient.post(url, data);
  },

  update(id, data) {
    const url = `/admin/vouchers/${id}`;
    return axiosClient.put(url, data);
  },

  remove(id) {
    const url = `/admin/vouchers/${id}`;
    return axiosClient.delete(url);
  },
};
export default voucherApi;
