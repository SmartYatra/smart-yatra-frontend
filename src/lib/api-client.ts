import Axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import MockAdapter from 'axios-mock-adapter';

import { ENV } from '@/config/env';

function authRequestInterceptor(config: InternalAxiosRequestConfig) {
  if (config.headers) {
    // Set the Accept header
    config.headers.Accept = 'application/json';

    // Set the language header
    const language = 'en';
    config.headers['Accept-Language'] = language;

    // Set the Authorization header
    const token = 'token'; // Replace with real token management (e.g., get from storage)
    config.headers['Authorization'] = `Bearer ${token}`;
  }

  config.withCredentials = true;
  return config;
}

// Response interceptor for handling responses globally
function handleResponseInterceptor(response: AxiosResponse) {
  return response;
}

// Response interceptor for handling errors globally
function handleErrorInterceptor(error: AxiosError) {
  if (error.response?.status === 401) {
    // Handle unauthorized errors (e.g., redirect to login)
    console.error('Unauthorized! Redirecting to login.');
  } else if (error.response?.status === 500) {
    // Handle server errors
    console.error('Server error! Please try again later.');
  }

  return Promise.reject(error);
}

// API instance
export const api = Axios.create({
  baseURL: ENV.VITE_API_URL,
});

// Apply the request and response interceptors
api.interceptors.request.use(authRequestInterceptor);
api.interceptors.response.use(handleResponseInterceptor, handleErrorInterceptor);

// Mock API for testing
export const mockApi = Axios.create({
  baseURL: ENV.VITE_API_URL,
});

// This is the mock adapter that will be used to mock the API requests
export const adapter = new MockAdapter(mockApi, { delayResponse: 1000 });
