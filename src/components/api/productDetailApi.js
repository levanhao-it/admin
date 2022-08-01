import axiosClient from "./axiosClient";

const productDetailApi = {
  login(data) {
    const url = "/admin/login";
    return axiosClient.post(url, data);
  },

  add(id, data) {
    const url = `/admin/products/${id}`;
    return axiosClient.post(url, data, {
      headers: {
        "Content-Type": "application/",
      },
    });
  },

  update(idProduct, id, data) {
    const url = `/admin/products/${idProduct}/productDetails/${id}`;
    return axiosClient.put(url, data);
  },

  remove(idProduct, id) {
    const url = `/admin/products/${idProduct}/productDetails/${id}`;
    return axiosClient.delete(url);
  },
};
export default productDetailApi;
