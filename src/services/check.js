import { Axios } from './axios';

export const getAllCheck = async query => {
  const result = await Axios.get(`/check?${query}`);
  return result;
};
export const createCheck = async data => {
  const result = await Axios.post('/check', data);
  return result.data;
};

export const createDefaultCheck = async data => {
  const result = await Axios.post('/check/default', data);
  return result.data;
};

export const updateCheck = async (id, data) => {
  const result = await Axios.put(`/check/${id}`, data);
  return result.data;
};
export const deleteCheck = async id => {
  const result = await Axios.delete(`/check/${id}`);
  return result.data;
};
export const getCheckById = async id => {
  const result = await Axios.get(`/check/${id}`);
  return result.data;
};
