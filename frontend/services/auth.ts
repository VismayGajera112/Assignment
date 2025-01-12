import api from './api';

export const login = (data: { email: string; password: string }) => {
  return api.post('/auth/login', data);
};

export const register = (data: { email: string; password: string; role: string }) => {
  return api.post('/auth/register', data);
};

export const resetPassword = (data: { email: string }) => {
  return api.post('/auth/reset-password', data);
};
