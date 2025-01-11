import Axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';

function authRequestInterceptor(config: InternalAxiosRequestConfig) {
  if (config.headers) {
    // Set the Accept header
    config.headers.Accept = 'application/json';

    // Set the language header
    const language = 'en';
    config.headers['Accept-Language'] = language;

    // Set the Authorization header
    const token = localStorage.getItem('token');
    config.headers['Authorization'] = token ? `Token ${token}` : '';
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
  baseURL: process.env.API_URL,
});

// Apply the request and response interceptors
api.interceptors.request.use(authRequestInterceptor);
api.interceptors.response.use(
  handleResponseInterceptor,
  handleErrorInterceptor
);
