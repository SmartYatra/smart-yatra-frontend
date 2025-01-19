import Axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import MockAdapter from 'axios-mock-adapter';

function authRequestInterceptor(config: InternalAxiosRequestConfig) {
  if (config.headers) {
    // Set the Accept header
    config.headers.Accept = 'application/json';

    // Set the language header
    const language = 'en';
    config.headers['Accept-Language'] = language;

    // Set the Authorization header
    const token = localStorage.getItem('authToken');
    config.headers['Authorization'] = token ? `Token ${token}` : '';
  }

  config.withCredentials = true;
  return config;
}

// Response interceptor for handling responses globally
function handleResponseInterceptor(response: AxiosResponse) {
  return response;
}

// API instance
export const api = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// Next.js API routes instance
export const nextApi = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_APP_URL,
});

// Apply the request and response interceptors
api.interceptors.request.use(authRequestInterceptor);
api.interceptors.response.use(handleResponseInterceptor);

// Mock API for testing
export const mockApi = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// This is the mock adapter that will be used to mock the API requests
export const adapter = new MockAdapter(mockApi, { delayResponse: 1000 });
