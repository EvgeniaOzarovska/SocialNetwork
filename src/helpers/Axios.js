import axios from 'axios';
import { AUTH_TOKEN_KEY, BACKEND_BASE_URL } from 'variables';

// Setup Axios instance
const Axios = axios.create({
  baseURL: BACKEND_BASE_URL,
  headers: {
    common: {
      'Content-Type': 'application/json; charset=utf-8',
      Accept: 'application/json',
    },
  },
});

// Add basic bearer token request interceptor
Axios.interceptors.request.use(config => {
  // If we have an access token - add an access token
  // as an authorization header to the current request
  const authToken = localStorage.getItem(AUTH_TOKEN_KEY);
  if (authToken) config.headers.Authorization = `Bearer ${authToken}`;

  return config;
});

export { Axios };
