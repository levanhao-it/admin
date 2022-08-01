import axiosClient from './axiosClient';

const userApi = {
  login(data) {
    const url = '/admin/login';
    return axiosClient.post(url, data);
  },
  register(data) {
    const url = '/register';
    return axiosClient.post(url, data);
  },
  getAllUser() {
    const url = `/admin/users`;
    return axiosClient.get(url);
  },
  getById(id) {
    const url = `/admin/users/${id}`;
    return axiosClient.get(url);
  },

  add(data) {
    const url = '/admin/users';
    return axiosClient.post(url, data);
  },

  update(id, data) {
    const url = `/admin/users/${id}`;
    return axiosClient.put(url, data);
  },

  remove(id) {
    const url = `/admin/users/${id}`;
    return axiosClient.delete(url);
  },

  logout() {
    const url = '/logout';
    return axiosClient.get(url);
  },
};
export default userApi;
