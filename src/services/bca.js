import { Axios } from './axios';

export const getAllBcas = async query => {
  const result = await Axios.get(`/bca?${query}`);
  return result;
};
export const createBcas = async data => {
  const result = await Axios.post('/bca', data);
  return result;
};
export const getBcaById = async id => {
  const result = await Axios.get(`/bca/${id}`);
  return result?.data;
};
export const updateBca = async (id, data) => {
  const result = await Axios.put(`/bca/${id}`, data);
  return result;
};
export const deleteBca = async id => {
  const result = await Axios.delete(`/bca/${id}`);
  return result.data;
};

//configuraion

export const createBcaConfiguration = async (data, id) => {
  const result = await Axios.put(`/bca/configurations/${id}`, data);
  return result;
};

export const getBcaConfigurationById = async id => {
  const result = await Axios.get(`/bca/configurations/${id}`);
  return result;
};

export const getBcaInsights = async id => {
  const result = await Axios.get(`/bca/insights/${id}`);
  return result?.data;
};
