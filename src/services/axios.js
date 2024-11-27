/* eslint-disable no-undef */
import {
  accessTokenCookieName,
  apiBaseUrl,
  ledgerBaseUrl,
} from '@/lib/constants';
import axios from 'axios';
import cookies from 'js-cookie';
import { toast } from 'sonner';
import { handleLogout, refreshAccessToken } from './auth.js';
let retries = 0;

export const Axios = axios.create({
  baseURL: apiBaseUrl,
});
export const LedgerAxios = axios.create({
  baseURL: ledgerBaseUrl,
});
const getRequestConfig = config => {
  // const token = cookies.get(accessTokenCookieName);
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzQwMjRmMzhlYjY5MjI1NzFiY2M0OGYiLCJlbWFpbCI6InByYWJpcmtybWFqZWVAZ21haWwuY29tIiwiaWF0IjoxNzMyMjc3MzQ0LCJleHAiOjE3MzIyNzczNDV9.0qdwJAtfkHVnObgePsIXIQJpCNo6YMWlpg_vfkhBOzo';
  if (token) {
    config.headers.Authorization = token;
  }
  config.headers['ngrok-skip-browser-warning'] = 1;

  return config;
};
const getRequestError = error => {
  console.log('Request Error', error);
  return Promise.reject(error);
};
const getResponseError = async error => {
  if (error.response) {
    // Request made and server responded
    switch (error.response.status) {
      case 400: {
        console.log('Bad Request');
        break;
      }
      case 401: {
        const originalRequest = error.config;
        if (retries < 3) {
          retries++;
          const newToken = await refreshAccessToken();
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return Axios(originalRequest);
        } else {
          handleLogout();
        }
        break;
      }

      case 403: {
        console.log('Forbidden');
        break;
      }
      case 404: {
        console.log('Not Found');
        break;
      }
      case 500: {
        console.log('Internal Server Error');
        break;
      }
      case 502: {
        console.log('Bad Gateway');
        break;
      }
      case 503: {
        console.log('Service Unavailable');
        break;
      }
      case 504: {
        console.log('Gateway Timeout');
        break;
      }
      default: {
        break;
      }
    }
  } else if (error.request) {
    // The request was made but no response was received
    console.log('Error Request :', error.request);
  } else {
    // Something happened in setting up the request that triggered an Error
    console.log('Error Message :', error.message);
  }
  if (Array.isArray(error?.response?.data?.msg)) {
    error.response.data.msg?.forEach(message => {
      toast.error(`${message.msg}` ?? 'Something went wrong!');
    });
  } else {
    toast.error(`${error?.message}` ?? 'Something went wrong!');
  }
  return Promise.reject(new Error(error?.message ?? 'Something went wrong!'));
};
const getResponseConfig = response => {
  return response.data;
};
Axios.interceptors.request.use(getRequestConfig, getRequestError);
Axios.interceptors.response.use(getResponseConfig, getResponseError);
LedgerAxios.interceptors.request.use(getRequestConfig, getRequestError);
LedgerAxios.interceptors.response.use(getResponseConfig, getResponseError);
