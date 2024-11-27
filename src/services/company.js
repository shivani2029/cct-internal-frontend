import { Axios } from './axios';

export const getAllCompany = async query => {
  const result = await Axios.get(`/company?${query}`);
  return result;
};
export const createCompany = async data => {
  const result = await Axios.post('/company', data);
  return result;
};
export const getCompanyById = async id => {
  const result = await Axios.get(`/company/${id}`);
  return result?.data;
};
export const updateCompany = async (id, data) => {
  const result = await Axios.put(`/company/${id}`, data);
  return result;
};
export const deleteCompany = async id => {
  const result = await Axios.delete(`/company/${id}`);
  return result.data;
};
