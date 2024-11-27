import { Axios } from './axios';

export const getAllDashboardData = async () => {
  const result = await Axios.get(`/userVerificationRequest/status/count`);
  return result.docs;
};
