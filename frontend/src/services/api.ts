import axios from 'axios';
import { User, Paper, PaperDetail, Subscription, StudentVerification } from '../types';

const API_BASE_URL = '/api/v1';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authApi = {
  signup: async (data: any) => {
    const resp = await api.post('/auth/signup', data);
    return resp.data;
  },
  login: async (data: any) => {
    const resp = await api.post('/auth/login', data);
    return resp.data;
  },
  forgotPassword: async (email: string) => {
    const resp = await api.post('/auth/forgot-password', { email });
    return resp.data;
  },
  resetPassword: async (data: any) => {
    const resp = await api.post('/auth/reset-password', data);
    return resp.data;
  },
  getMe: async (): Promise<User> => {
    const resp = await api.get('/auth/me');
    return resp.data;
  },
};

export const onboardingApi = {
  setPersona: async (persona: 'student' | 'professional'): Promise<User> => {
    const resp = await api.post('/onboarding/persona', { persona });
    return resp.data;
  },
  verifyStudentId: async (file: File): Promise<StudentVerification> => {
    const formData = new FormData();
    formData.append('file', file);
    const resp = await api.post('/onboarding/verify-student-id', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return resp.data;
  },
};

export const papersApi = {
  create: async (data: any): Promise<Paper> => {
    const resp = await api.post('/papers/', data);
    return resp.data;
  },
  list: async (): Promise<Paper[]> => {
    const resp = await api.get('/papers/');
    return resp.data;
  },
  getById: async (id: string): Promise<PaperDetail> => {
    const resp = await api.get(`/papers/${id}`);
    return resp.data;
  },
  ocrTitle: async (file: File): Promise<{ extracted_text: string }> => {
    const formData = new FormData();
    formData.append('file', file);
    const resp = await api.post('/papers/ocr-title', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return resp.data;
  },
};

export const subscriptionApi = {
  getSubscription: async (): Promise<Subscription> => {
    const resp = await api.get('/subscriptions/me');
    return resp.data;
  },
  createOrder: async (plan_tier: string) => {
    const resp = await api.post('/subscriptions/create-order', { plan_tier });
    return resp.data;
  },
};
