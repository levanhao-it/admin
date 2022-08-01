import axiosClient from './axiosClient';

const addressApi = {
  getAllAddressByUser(email) {
    const url = `/admin/address`;
    return axiosClient.get(url, {
      params: {
        mail: `${email}`,
      },
    });
  },
};
export default addressApi;
