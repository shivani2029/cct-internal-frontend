import { Axios } from './axios';

export const getAllUser = async query => {
  const result = await Axios.get(`/users?${query}`);
  return result.data;
};

export const getUserById = async id => {
  const result = await Axios.get(`/users/${id}`);
  return result.data;
};
