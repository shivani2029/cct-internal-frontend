import { Axios } from './axios';

export const getAllVendorCheck = async query => {
  const result = await Axios.get(`/vendorcheck?${query}`);
  return result;
};
export const assignCheck = async data => {
  const result = await Axios.put(`/vendorcheck/assign`, data);
  return result.docs;
};
