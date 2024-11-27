import { Axios } from './axios';

export const getAllRoles = async query => {
  const result = await Axios.get(`/roles?${query}`);
  return result;
};
export const createRoles = async data => {
  const result = await Axios.post('/roles', data);
  return result.docs;
};
export const getRolesById = async id => {
  const result = await Axios.get(`/roles/${id}`);
  return result;
};
export const updateRoles = async (id, data) => {
  const result = await Axios.put(`/roles/${id}`, data);
  return result.data;
};
export const deleteRoles = async id => {
  const result = await Axios.delete(`/roles/${id}`);
  return result.data;
};
// permissions

export const getAllPermission = async query => {
  const result = await Axios.get(`/permissions?${query}`);
  return result;
};
