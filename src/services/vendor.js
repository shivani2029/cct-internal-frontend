import { Axios } from './axios';

export const getAllVendor = async query => {
  const result = await Axios.get(`/ExternalVendor?${query}`);
  return result;
};
export const createVendor = async data => {
  const result = await Axios.post('/ExternalVendor', data);
  return result.docs;
};
export const getVendorById = async id => {
  const result = await Axios.get(`/ExternalVendor/${id}`);
  return result;
};
export const updateVendor = async (id, data) => {
  const result = await Axios.put(`/ExternalVendor/${id}`, data);
  return result.data;
};
export const deleteVendor = async id => {
  const result = await Axios.delete(`/ExternalVendor/${id}`);
  return result.data;
};
